import { User } from "../entities/user/user";
import { MyContext } from "../types";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "./inputs/UsernamePasswordInput";
import { validateRegister } from "../utils/validation/validateRegister";
import { getConnection } from "typeorm";
import { NewUsernameInput } from "./inputs/NewUsernameInput";
import { validateNewUsername } from "../utils/validation/validateNewUsername";
import { UserDetailsInput } from "./inputs/UserDetailsInput";
import { isAuth } from "../middleware/isAuth";
import { validateUserDetails } from "../utils/validation/validateUserDetails";
import aws from "aws-sdk";

@ObjectType()
class S3Payload {
    @Field(() => String)
    signedRequest: String;

    @Field(() => String)
    url: String;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

//returns either Field Error, with message and field, or user if worked correctly
@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() { req }: MyContext) {
        //checks the current user so that they can see their own email
        if (req.session.userId === user.id) {
            return user.email;
        }
        return "";
    }

    //check if user is logged in, get current user
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Query(() => Boolean, { nullable: true })
    async checkIfUsernameTaken(
        @Arg("username") username: string
    ): Promise<boolean | null> {
        const user = await User.findOne({ where: { username } });
        if (user) {
            return true;
        }
        return false;
    }

    //get specific user by id
    @Query(() => User, { nullable: true })
    getUser(@Arg("id", () => Int) id: number): Promise<User | undefined> {
        return User.findOne(id);
    }

    @Query(() => User, { nullable: true })
    async getUserByUsername(
        @Arg("username") username: string
    ): Promise<User | undefined> {
        const user = await User.findOne({ where: { username } });
        return user;
    }

    //mutation for changing password in settings page
    @Mutation(() => UserResponse)
    async settingsChangePassword(
        @Arg("currentPassword") currentPassword: string,
        @Arg("settingsNewPassword") settingsNewPassword: string,
        @Arg("id", () => Int) id: number
    ): Promise<UserResponse | null> {
        //find username from User table where username equals given username
        const findUser = await User.findOne({ where: { id } });
        if (!findUser) {
            //if user is not found
            return null;
        }
        //verify hashed password in user table is equal to given currentPassword
        const valid = await argon2.verify(findUser.password, currentPassword);

        //if users current password is incorrect return error
        if (!valid) {
            return {
                errors: [
                    {
                        field: "currentPassword",
                        message: "Details entered are incorrect",
                    },
                ],
            };
        }
        //check if new password provided by user is the same as their current password
        const checkIfSame = await argon2.verify(
            findUser.password,
            settingsNewPassword
        );
        if (checkIfSame) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message:
                            "New password cannot be same as current password.",
                    },
                ],
            };
        }

        //hash password using argon2 to store in db
        const hashedPassword = await argon2.hash(settingsNewPassword);
        let user;
        //update query using querybuilder to update password in User table
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ password: hashedPassword })
                .where("id = :id", { id: findUser.id })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            console.log(err);
        }
        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async editUserDetails(
        @Arg("input") input: UserDetailsInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        //validate input
        const errors = validateUserDetails(input);
        if (errors) {
            return { errors };
        }

        let user;
        //get current user's id
        const { userId } = req.session;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    ...input,
                })
                .where("id = :id", { id: userId })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            console.log(err);
        }

        return {
            user,
        };
    }

    //change username mutation
    @Mutation(() => UserResponse, { nullable: true })
    @UseMiddleware(isAuth)
    async changeUsername(
        @Arg("input") input: NewUsernameInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse | null> {
        //validate errors in input using validateNewUsername function
        const errors = validateNewUsername(input);
        if (errors) {
            return { errors };
        }
        let user;
        //find user by id from User table
        const userId = await User.findOne(req.session.userId);
        try {
            //update query using querybuilder to update username in User table
            const result = await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ username: input.newUsername })
                .where("id = :id", { id: userId?.id })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            //if chosen username already exists in User table, return this error as FieldError format
            if (
                err.detail.includes(
                    `(username)=(${input.newUsername}) already exists`
                )
            ) {
                return {
                    errors: [
                        {
                            field: "newUsername",
                            message: "Username already exists.",
                        },
                    ],
                };
            }
        }
        return {
            user,
        };
    }

    //register
    @Mutation(() => UserResponse)
    async register(
        @Arg("input") input: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        //use validateRegister func to validate user input
        const errors = validateRegister(input);
        if (errors) {
            return { errors };
        }

        const tempUsername = input.username.toLowerCase();
        //uses argon2 to hash password
        const hashedPassword = await argon2.hash(input.password);
        let user;
        try {
            //User.create({}).save();
            //insert new user into User table using query builder, can use above method that is commented out
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: tempUsername,
                    email: input.email,
                    password: hashedPassword,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            console.log(err);
            //check error code to see if username is already taken
            if (
                err.detail.includes(
                    `(username)=(${tempUsername}) already exists`
                )
            ) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Username already exists.",
                        },
                    ],
                };
            }

            //if email already exists in User table
            if (
                err.detail.includes(`(email)=(${input.email}) already exists`)
            ) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "E-mail has already been taken.",
                        },
                    ],
                };
            }
        }
        //log userid into cookie, to auto log user in
        req.session.userId = user.id;
        return {
            user,
        };
    }

    //login
    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        //if given email, find by email from User table
        //if given username, find by username from User table
        const user = await User.findOne(
            usernameOrEmail.includes("@")
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        );
        //if user does not exist
        if (!user) {
            return {
                errors: [
                    {
                        field: "usernameOrEmail",
                        message: "Details entered are incorrect",
                    },
                ],
            };
        }
        //verify that password given in form is equal to password stored in User table
        const valid = await argon2.verify(user.password, password);
        //if password is incorrect
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Details entered are incorrect",
                    },
                ],
            };
        }
        //log userid into cookie, to auto log user in
        req.session.userId = user.id;
        return {
            user,
        };
    }

    //logout
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                //clear cookie stored in browser
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                } else {
                    resolve(true);
                }
            })
        );
    }

    @Mutation(() => S3Payload)
    async signS3(
        @Arg("filename") filename: string,
        @Arg("filetype") filetype: string
    ): Promise<S3Payload | undefined> {
        const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Expires: 60,
            ContentType: filetype,
            ACL: "public-read",
        };

        const signedRequest = await s3.getSignedUrl("putObject", s3Params);
        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

        return {
            signedRequest,
            url,
        };
    }
}

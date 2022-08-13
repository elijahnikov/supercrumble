"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const user_1 = require("../entities/user");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const UsernamePasswordInput_1 = require("./inputs/UsernamePasswordInput");
const validateRegister_1 = require("../utils/validateRegister");
const typeorm_1 = require("typeorm");
const NewUsernameInput_1 = require("./inputs/NewUsernameInput");
const validateNewUsername_1 = require("../utils/validateNewUsername");
const UserDetailsInput_1 = require("./inputs/UserDetailsInput");
const isAuth_1 = require("../middleware/isAuth");
const validateUserDetails_1 = require("../utils/validateUserDetails");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
let S3Payload = class S3Payload {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", typeof (_a = typeof String !== "undefined" && String) === "function" ? _a : Object)
], S3Payload.prototype, "signedRequest", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", typeof (_b = typeof String !== "undefined" && String) === "function" ? _b : Object)
], S3Payload.prototype, "url", void 0);
S3Payload = __decorate([
    (0, type_graphql_1.ObjectType)()
], S3Payload);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User, { nullable: true }),
    __metadata("design:type", user_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    email(user, { req }) {
        if (req.session.userId === user.id) {
            return user.email;
        }
        return '';
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            return user_1.User.findOne(req.session.userId);
        });
    }
    getUser(id) {
        return user_1.User.findOne(id, { relations: ["posts"] });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { username } });
            return user;
        });
    }
    settingsChangePassword(currentPassword, settingsNewPassword, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_1.User.findOne({ where: { username: username } });
            if (!findUser) {
                return null;
            }
            const valid = yield argon2_1.default.verify(findUser.password, currentPassword);
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
            const checkIfSame = yield argon2_1.default.verify(findUser.password, settingsNewPassword);
            if (checkIfSame) {
                return {
                    errors: [
                        {
                            field: 'newPassword',
                            message: 'New password cannot be same as current password.'
                        }
                    ]
                };
            }
            const hashedPassword = yield argon2_1.default.hash(settingsNewPassword);
            let user;
            try {
                const result = yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(user_1.User)
                    .set({ password: hashedPassword })
                    .where("id = :id", { id: findUser.id })
                    .returning('*')
                    .execute();
                user = result.raw[0];
            }
            catch (err) {
                console.log(err);
            }
            return {
                user
            };
        });
    }
    editUserDetails(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validateUserDetails_1.validateUserDetails)(input);
            if (errors) {
                return { errors };
            }
            let user;
            const { userId } = req.session;
            try {
                const result = yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(user_1.User)
                    .set({
                    bio: input.bio,
                    bioLink: input.bioLink,
                    displayName: input.displayName,
                    avatar: input.avatar,
                    onboarded: input.onboarded
                })
                    .where("id = :id", { id: userId })
                    .returning('*')
                    .execute();
                user = result.raw[0];
            }
            catch (err) {
                console.log(err);
            }
            return {
                user
            };
        });
    }
    changeUsername(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validateNewUsername_1.validateNewUsername)(input);
            if (errors) {
                return { errors };
            }
            let user;
            const userId = yield user_1.User.findOne(req.session.userId);
            try {
                const result = yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(user_1.User)
                    .set({ username: input.newUsername })
                    .where("id = :id", { id: userId === null || userId === void 0 ? void 0 : userId.id })
                    .returning('*')
                    .execute();
                user = result.raw[0];
            }
            catch (err) {
                if (err.detail.includes(`(username)=(${input.newUsername}) already exists`)) {
                    return {
                        errors: [
                            {
                                field: 'newUsername',
                                message: 'Username already exists.'
                            }
                        ]
                    };
                }
            }
            return {
                user
            };
        });
    }
    register(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validateRegister_1.validateRegister)(input);
            if (errors) {
                return { errors };
            }
            const tempUsername = input.username.toLowerCase();
            const hashedPassword = yield argon2_1.default.hash(input.password);
            let user;
            try {
                const result = yield (0, typeorm_1.getConnection)().createQueryBuilder().insert().into(user_1.User).values({
                    username: tempUsername,
                    email: input.email,
                    password: hashedPassword
                }).returning('*').execute();
                user = result.raw[0];
            }
            catch (err) {
                console.log(err);
                if (err.detail.includes(`(username)=(${tempUsername}) already exists`)) {
                    return {
                        errors: [
                            {
                                field: "username",
                                message: "Username already exists."
                            }
                        ]
                    };
                }
                if (err.detail.includes(`(email)=(${input.email}) already exists`)) {
                    return {
                        errors: [
                            {
                                field: 'email',
                                message: 'E-mail has already been taken.'
                            }
                        ]
                    };
                }
            }
            req.session.userId = user.id;
            return {
                user
            };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne(usernameOrEmail.includes('@')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } });
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
            const valid = yield argon2_1.default.verify(user.password, password);
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
            req.session.userId = user.id;
            return {
                user,
            };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            else {
                resolve(true);
            }
        }));
    }
    signS3(filename, filetype) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION
            });
            const s3Params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Expires: 60,
                ContentType: filetype,
                ACL: 'public-read'
            };
            const signedRequest = yield s3.getSignedUrl('putObject', s3Params);
            const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
            return {
                signedRequest,
                url
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => String),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserResolver.prototype, "getUserByUsername", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('currentPassword')),
    __param(1, (0, type_graphql_1.Arg)('settingsNewPassword')),
    __param(2, (0, type_graphql_1.Arg)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserResolver.prototype, "settingsChangePassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDetailsInput_1.UserDetailsInput, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserResolver.prototype, "editUserDetails", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewUsernameInput_1.NewUsernameInput, Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserResolver.prototype, "changeUsername", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput_1.UsernamePasswordInput, Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('usernameOrEmail')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => S3Payload),
    __param(0, (0, type_graphql_1.Arg)('filename')),
    __param(1, (0, type_graphql_1.Arg)('filetype')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserResolver.prototype, "signS3", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map
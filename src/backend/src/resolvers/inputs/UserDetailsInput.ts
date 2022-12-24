import { Field, InputType } from "type-graphql";

//input object for register/login
@InputType()
export class UserDetailsInput {
    @Field({ nullable: true })
    bio: string;

    @Field({ nullable: true })
    bioLink: string;

    @Field({ nullable: true })
    displayName: string;

    @Field({ nullable: true })
    avatar: string;

    @Field({ nullable: true })
    header: string;

    @Field({ nullable: true })
    onboarded: boolean;
}

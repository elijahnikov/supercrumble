import { Field, InputType } from "type-graphql";

@InputType()
export class FilmListInput {
    @Field()
    title!: string;

    @Field()
    description: string;

    @Field()
    tags: string;

    @Field({ nullable: true })
    filmOnePosterPath?: string;

    @Field({ nullable: true })
    filmTwoPosterPath?: string;

    @Field({ nullable: true })
    filmThreePosterPath?: string;

    @Field({ nullable: true })
    filmFourPosterPath?: string;

    @Field({ nullable: true })
    filmFivePosterPath?: string;
}

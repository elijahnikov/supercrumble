import { InputType, Field } from "type-graphql";

@InputType()
export class ReviewInput {
    @Field()
    movieId: number;

    @Field()
    text: string;

    @Field()
    movie_poster: string;

    @Field()
    backdrop: string;

    @Field({ nullable: true })
    watchedOn: string;

    @Field()
    movie_title: string;

    @Field()
    movie_release_year: number;

    @Field()
    ratingGiven: number;

    @Field()
    containsSpoilers: boolean;

    @Field()
    tags: string;
}

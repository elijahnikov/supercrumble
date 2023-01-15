import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateWatchedInput {
    @Field(() => Int)
    filmId: number;

    @Field(() => String)
    filmTitle: string;

    @Field()
    ratingGiven: number;

    @Field(() => String)
    posterPath: string;
}

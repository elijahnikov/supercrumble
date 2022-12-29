import { InputType, Field } from "type-graphql";

@InputType()
export class CreateWatchedInput {
    @Field()
    filmId: number;

    @Field()
    filmTitle: string;

    @Field()
    posterPath: string;
}

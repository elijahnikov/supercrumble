import { Field, InputType } from "type-graphql";

@InputType()
export class FilmInput {
    @Field()
    movieId!: number;

    @Field()
    movieTitle!: string;

    @Field()
    overview!: string;

    @Field()
    posterPath!: string;

    @Field()
    backdropPath!: string;

    @Field()
    releaseDate!: string;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class FilmInput {
    @Field()
    movieId!: number;

    @Field()
    movieTitle!: string;

    @Field({ nullable: true })
    overview: string;

    @Field({ nullable: true })
    posterPath: string;

    @Field({ nullable: true })
    backdropPath: string;

    @Field()
    releaseDate!: string;
}

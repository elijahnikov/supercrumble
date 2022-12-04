import { Field, InputType } from "type-graphql";

@InputType()
export class FilmListInput {
    @Field()
    title!: string;

    @Field()
    description: string;

    @Field()
    tags: string;
}

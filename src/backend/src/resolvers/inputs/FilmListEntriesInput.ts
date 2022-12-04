import { Field, InputType } from "type-graphql";

@InputType()
export class FilmListEntriesInput {
    @Field()
    listId!: number;

    @Field()
    filmId!: number;
}

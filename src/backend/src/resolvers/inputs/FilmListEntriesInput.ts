import { Field, InputType } from "type-graphql";

@InputType()
export class FilmListEntriesInput {
    @Field()
    listId!: string;

    @Field()
    filmId!: number;
}

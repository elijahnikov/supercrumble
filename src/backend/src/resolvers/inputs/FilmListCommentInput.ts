import { Field, InputType } from "type-graphql";

@InputType()
export class FilmListCommentInput {
    @Field()
    filmListId: string;

    @Field()
    text: string;
}

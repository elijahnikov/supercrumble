import { Field, InputType } from "type-graphql";

@InputType()
export class ReviewCommentInput {
  @Field()
  reviewId: number;

  @Field({ nullable: true })
  parentId: number;

  @Field()
  text: string;
}

@InputType()
export class ReviewCommentReplyInput {
  @Field()
  reviewId: number;

  @Field()
  parentId: number;

  @Field()
  text: string;
}

import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review";
import { ReviewCommentUpvote } from "./reviewCommentUpvote";
import { User } from "./user";

//Review Comment table
@ObjectType()
@Entity()
export class ReviewComment extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({nullable: true})
  @Column({nullable: true})
  parentId: number;

  @Field()
  @Column()
  creatorId: number;
  
  @Field()
  @Column()
  reviewId: number;

  @ManyToOne(() => User, user => user.reviewComments)
  creator: User;

  @ManyToOne(() => Review, review => review.reviewComments)
  review: Review;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({type: "int", default: 0})
  score!: number;

  @Field(() => Int, {nullable: true})
  voteStatus: number | null;//1 or -1 or null

  @OneToMany(() => ReviewCommentUpvote, reviewCommentUpvote => reviewCommentUpvote.reviewComment)
  upvotes: ReviewCommentUpvote[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Review } from "./review";
import { ReviewComment } from "./reviewComment";
import { ReviewCommentUpvote } from "./reviewCommentUpvote";
import { Upvote } from "./upvote";

//User table in db
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bioLink: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "int" })
  totalFilmsWatched: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "int" })
  totalHoursWatched: number;

  @OneToMany(() => Review, (review) => review.creator)
  reviews: Review[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @OneToMany(
    () => ReviewCommentUpvote,
    (reviewCommentUpvote) => reviewCommentUpvote.user
  )
  reviewCommentUpvotes: ReviewCommentUpvote[];

  @OneToMany(() => ReviewComment, (reviewComment) => reviewComment.creator)
  reviewComments: ReviewComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  usernameChangeDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  onboarded: boolean;
}

import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Upvote } from "./upvote";
import { User } from "./user";
import { nanoid } from "nanoid";
import { ReviewComment } from "./reviewComment";

//Review table in db
@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "varchar" })
  referenceId!: string;

  @BeforeInsert()
  setId() {
    this.referenceId = nanoid(10);
  }

  @Field()
  @Column({ type: "int" })
  movieId: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.reviews)
  creator: User;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  containsSpoilers: boolean;

  @Field()
  @Column({ nullable: true })
  movie_poster: string;

  @Field()
  @Column({ type: "text" })
  movie_title: string;

  @Field()
  @Column({ type: "int" })
  movie_release_year: number;

  @Field()
  @Column({ type: "float" })
  ratingGiven: number;

  @Field()
  @Column({ type: "int", default: 0 })
  score!: number;

  @Field()
  @Column({ type: "int", default: 0 })
  noOfComments!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; //1 or -1 or null

  @OneToMany(() => Upvote, (upvote) => upvote.review)
  upvotes: Upvote[];

  @OneToMany(() => ReviewComment, (reviewComment) => reviewComment.review)
  reviewComments: ReviewComment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

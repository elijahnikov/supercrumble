import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { FilmList } from "../filmList/filmList";
import { FilmListComment } from "../filmList/filmListComment";
import { FilmListUpvote } from "../filmList/filmListUpvote";
import { Review } from "../review/review";
import { ReviewComment } from "../review/reviewComment";
import { ReviewCommentUpvote } from "../review/reviewCommentUpvote";
import { Upvote } from "../review/upvote";
import { Subscription } from "../subscription/subscription";

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

    //USER STATS______________________________________________
    //________________________________________________________
    @Field({ nullable: true })
    @Column({ nullable: true, type: "int" })
    totalFilmsWatched: number;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "int" })
    totalHoursWatched: number;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "int" })
    totalListsCreated: number;

    @Field()
    @Column({ default: 0, type: "int" })
    followers: number;

    @Field()
    @Column({ default: 0, type: "int" })
    following: number;

    //FILM LIST RELATIONSHIP___________________________________
    //_________________________________________________________
    @OneToMany(() => FilmList, (filmList) => filmList.creator)
    lists: FilmList[];

    @OneToMany(() => FilmListUpvote, (filmListUpvote) => filmListUpvote.user)
    filmListUpvotes: FilmListUpvote[];

    @OneToMany(
        () => FilmListComment,
        (filmListComment) => filmListComment.creator
    )
    filmListComments: FilmListComment[];

    //REVIEW RELATIONSHIP_______________________________________
    //__________________________________________________________
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

    //SUBSCRIPTION RELATIONSHIP_________________________________
    //__________________________________________________________
    @ManyToMany(() => Subscription, (subscription) => subscription.follower)
    subscription: Subscription[];
}

import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user/user";
import { FilmListComment } from "./filmListComment";
import { FilmListEntries } from "./filmListEntries";
import { FilmListUpvote } from "./filmListUpvote";

@ObjectType()
@Entity()
export class FilmList extends BaseEntity {
    @Field()
    @PrimaryColumn({ type: "varchar" })
    id!: string;

    @Field()
    @Column()
    title!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field()
    @Column()
    tags?: string;

    @Field()
    @Column({ type: "int", default: 0 })
    score!: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filmOnePosterPath?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filmTwoPosterPath?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filmThreePosterPath?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filmFourPosterPath?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filmFivePosterPath?: string;

    @OneToMany(() => FilmListEntries, (filmListEntries) => filmListEntries.list)
    entries: FilmListEntries[];

    @Field()
    @Column()
    creatorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.lists)
    creator: User;

    @OneToMany(
        () => FilmListUpvote,
        (filmListUpvote) => filmListUpvote.filmList
    )
    filmListUpvotes: FilmListUpvote[];

    @OneToMany(
        () => FilmListComment,
        (filmListComment) => filmListComment.filmList
    )
    filmListComments: FilmListComment[];

    @Field()
    @Column({ type: "int", default: 0 })
    noOfComments!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

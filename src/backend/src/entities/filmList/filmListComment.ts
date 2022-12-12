import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user";
import { FilmList } from "./filmList";

@ObjectType()
@Entity()
export class FilmListComment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    filmListId: string;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column({ type: "int", default: 0 })
    score!: number;

    @Field(() => Int, { nullable: true })
    voteStatus: number | null;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.filmListComments)
    creator: User;

    @ManyToOne(() => FilmList, (filmList) => filmList.filmListComments)
    filmList: FilmList;
}

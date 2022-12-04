import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user";
import { FilmListEntries } from "./filmListEntries";

@ObjectType()
@Entity()
export class FilmList extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field()
    @Column()
    tags?: string;

    @OneToMany(() => FilmListEntries, (filmListEntries) => filmListEntries.list)
    entry: FilmListEntries[];

    @Field()
    @Column()
    creatorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.lists)
    creator: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

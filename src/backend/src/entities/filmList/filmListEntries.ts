import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Films } from "../film/films";
import { FilmList } from "./filmList";

@ObjectType()
@Entity()
export class FilmListEntries extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    filmId: number;

    @Field()
    @Column()
    listId: string;

    @ManyToOne(() => FilmList, (filmList) => filmList.entries)
    list: FilmList;

    @ManyToOne(() => Films, (films) => films.listEntry)
    film: Films;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

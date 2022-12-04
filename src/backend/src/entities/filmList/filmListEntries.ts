import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
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
    listId: number;

    @ManyToOne(() => FilmList, (filmList) => filmList.entry)
    list: FilmList;
}

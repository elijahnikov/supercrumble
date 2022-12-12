import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../user";
import { FilmList } from "./filmList";

@Entity()
export class FilmListUpvote extends BaseEntity {
    @Column({ type: "int", nullable: true })
    value: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.filmListUpvotes)
    user: User;

    @PrimaryColumn()
    filmListId: number;

    @ManyToOne(() => FilmList, (filmList) => filmList.filmListUpvotes, {
        onDelete: "CASCADE",
    })
    filmList: FilmList;
}

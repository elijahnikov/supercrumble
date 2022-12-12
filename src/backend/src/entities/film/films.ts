import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { FilmListEntries } from "../filmList/filmListEntries";

@ObjectType()
@Entity()
export class Films extends BaseEntity {
    @Field()
    @PrimaryColumn()
    movieId!: number;

    @Field()
    @Column()
    movieTitle!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    overview: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    posterPath: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    backdropPath: string;

    @Field()
    @Column()
    releaseDate!: string;

    @Field()
    @Column({ default: 0 })
    watchCount!: number;

    @Field()
    @Column({ default: 0 })
    listCount!: number;

    @Field()
    @Column({ default: 0 })
    likeCount!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => FilmListEntries, (filmListEntry) => filmListEntry.film)
    listEntry: FilmListEntries;
}

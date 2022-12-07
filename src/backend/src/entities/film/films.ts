import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { FilmListEntries } from "../filmList/filmListEntries";

@ObjectType()
@Entity()
export class Films extends BaseEntity {
    // @Field()
    // @PrimaryGeneratedColumn()
    // id!: number;

    @Field()
    @PrimaryColumn()
    movieId!: number;

    @Field()
    @Column()
    movieTitle!: string;

    @Field()
    @Column()
    overview!: string;

    @Field()
    @Column()
    posterPath!: string;

    @Field()
    @Column()
    backdropPath!: string;

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

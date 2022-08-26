import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class FilmRatings extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    movieId: number;

    @Field()
    @Column({ default: 0 })
    numberOfRatings: number;

    @Field()
    @Column({ default: 0 })
    totalRatingValue: number;
}

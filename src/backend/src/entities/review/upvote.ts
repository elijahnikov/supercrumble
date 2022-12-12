import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Review } from "./review";
import { User } from "./user";

//Upvote table in db
@Entity()
export class Upvote extends BaseEntity{
    @Column({type: 'int', nullable: true})
    value: number

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.upvotes)
    user: User;

    @PrimaryColumn()
    reviewId: number;

    @ManyToOne(() => Review, (review) => review.upvotes, {
        onDelete: 'CASCADE',
    })
    review: Review;
}
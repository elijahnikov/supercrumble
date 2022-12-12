import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ReviewComment } from "./reviewComment";
import { User } from "./user";

@Entity()
export class ReviewCommentUpvote extends BaseEntity {
    @Column({type: 'int', nullable: true})
    value: number;

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    reviewCommentId: number;

    @ManyToOne(() => User, (user) => user.reviewCommentUpvotes)
    user: User;

    @ManyToOne(() => ReviewComment, (reviewComment) => reviewComment.upvotes, {
        onDelete: 'CASCADE',
    })
    reviewComment: ReviewComment;
}
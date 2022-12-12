import { ReviewComment } from "../../entities/review/reviewComment";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../../entities/user/user";
import { isAuth } from "../../middleware/isAuth";
import { ReviewCommentInput } from "../inputs/ReviewCommentInput";
import { getConnection } from "typeorm";
import { Review } from "../../entities/review/review";
import { ReviewCommentUpvote } from "../../entities/review/reviewCommentUpvote";

@ObjectType()
class PaginatedReviewComments {
    @Field(() => [ReviewComment])
    reviewComments: ReviewComment[];

    @Field()
    hasMore: boolean;
}

@Resolver(ReviewComment)
export class ReviewCommentResolver {
    @FieldResolver(() => User)
    creator(
        @Root() reviewComment: ReviewComment,
        @Ctx() { userLoader }: MyContext
    ) {
        return userLoader.load(reviewComment.creatorId);
    }

    @FieldResolver(() => Int, { nullable: true })
    async voteStatus(
        @Root() reviewComment: ReviewComment,
        @Ctx() { reviewCommentUpvoteLoader, req }: MyContext
    ) {
        if (!req.session.userId) {
            return null;
        }

        const reviewCommentUpvote = await reviewCommentUpvoteLoader.load({
            reviewCommentId: reviewComment.id,
            userId: req.session.userId,
        });

        return reviewCommentUpvote ? reviewCommentUpvote.value : null;
    }

    @Mutation(() => ReviewComment)
    @UseMiddleware(isAuth)
    async createReviewComment(
        @Arg("input") input: ReviewCommentInput,
        @Ctx() { req }: MyContext
    ): Promise<ReviewComment | null> {
        if (!req.session.userId) {
            return null;
        }

        await getConnection()
            .createQueryBuilder()
            .update(Review)
            .set({
                noOfComments: () => '"noOfComments" + 1',
            })
            .where("id = :id", { id: input.reviewId })
            .execute();

        return ReviewComment.create({
            text: input.text,
            reviewId: input.reviewId,
            parentId: input.parentId,
            creatorId: req.session.userId,
        }).save();
    }

    @Query(() => PaginatedReviewComments)
    async reviewComments(
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Arg("reviewId", () => Int) reviewId: number,
        @Arg("order", () => String, { nullable: true, defaultValue: "DESC" })
        order: "ASC" | "DESC" | undefined
    ): Promise<PaginatedReviewComments> {
        const maxLimit = Math.min(50, limit);
        const maxLimitPlusOne = maxLimit + 1;

        const replacements: any[] = [maxLimitPlusOne];
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const qb = getConnection()
            .getRepository(ReviewComment)
            .createQueryBuilder("cmt")
            .orderBy('cmt."createdAt"', order)
            .take(maxLimitPlusOne)
            .where('cmt."reviewId" = :review', { review: reviewId });
        if (cursor) {
            qb.andWhere('cmt. "createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const reviewComments = await qb.getMany();

        return {
            reviewComments: reviewComments.slice(0, maxLimit),
            hasMore: reviewComments.length === maxLimitPlusOne,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteReviewComment(
        @Arg("id", () => Int) id: number,
        @Arg("reviewId", () => Int) reviewId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        //check if post and post comment exist
        const review = await Review.findOne({ where: { id: reviewId } });
        const reviewComment = await ReviewComment.findOne({
            where: { id: id },
        });

        if (!review || !reviewComment) {
            return false;
        }

        await ReviewComment.delete({ id, creatorId: req.session.userId });

        await getConnection()
            .createQueryBuilder()
            .update(Review)
            .set({
                noOfComments: () => '"noOfComments" - 1',
            })
            .where("id = :id", { id: reviewId })
            .execute();

        return true;
    }

    @Mutation(() => ReviewComment, { nullable: true })
    @UseMiddleware(isAuth)
    async updateReviewComment(
        @Arg("id") id: number,
        @Arg("text") text: string,
        @Ctx() { req }: MyContext
    ): Promise<ReviewComment | null> {
        if (!req.session.userId) {
            return null;
        }

        const result = await getConnection()
            .createQueryBuilder()
            .update(ReviewComment)
            .set({ text })
            .where('id = :id and "creatorId" = :creatorId', {
                id,
                creatorId: req.session.userId,
            })
            .returning("*")
            .execute();

        return result.raw[0];
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async reviewCommentVote(
        @Arg("reviewCommentId", () => Int) reviewCommentId: number,
        @Arg("value", () => Int) value: number,
        @Ctx() { req }: MyContext
    ) {
        const { userId } = req.session;
        const reviewCommentUpvote = await ReviewCommentUpvote.findOne({
            where: { reviewCommentId, userId },
        });

        if (reviewCommentUpvote) {
            //if user has already voted on a post comment
            //and is changing their vote
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                    delete from review_comment_upvote
                    where "reviewCommentId" = $1 and "userId" = $2
                    `,
                    [reviewCommentId, userId]
                );

                await tm.query(
                    `
                    update review_comment
                    set score = score - 1
                    where id = $1;
                    `,
                    [reviewCommentId]
                );
            });
        } else if (!reviewCommentUpvote) {
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                    insert into review_comment_upvote ("userId", "reviewCommentId", value)
                    values ($1, $2, $3);
                    `,
                    [userId, reviewCommentId, value]
                );

                await tm.query(
                    `
                    update review_comment
                    set score = score + 1
                    where id = $1;
                    `,
                    [reviewCommentId]
                );
            });
        }
        return true;
    }

    //CRUD
    //get specific post
    @Query(() => ReviewComment, { nullable: true })
    reviewComment(
        @Arg("id", () => Int) id: number
    ): Promise<ReviewComment | undefined> {
        return ReviewComment.findOne({ where: { id } });
    }
}

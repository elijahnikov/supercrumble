import { Review } from "../../entities/review/review";
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
import { isAuth } from "../../middleware/isAuth";
import { getConnection } from "typeorm";
import { Upvote } from "../../entities/review/upvote";
import { User } from "../../entities/user/user";
import { ReviewInput } from "../inputs/ReviewInput";
import { Films } from "../../entities/film/films";
import { ReviewTags } from "../../entities/review/reviewTags";

//detect whether there is no more data to paginate through
@ObjectType()
class PaginatedReviews {
	@Field(() => [Review])
	reviews: Review[];

	@Field()
	hasMore: boolean;
}

@Resolver(Review)
export class ReviewResolver {
	@FieldResolver(() => User)
	creator(@Root() review: Review, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(review.creatorId);
	}

	@FieldResolver(() => Int, { nullable: true })
	async voteStatus(
		@Root() review: Review,
		@Ctx() { upvoteLoader, req }: MyContext
	) {
		if (!req.session.userId) {
			return null;
		}

		const upvote = await upvoteLoader.load({
			reviewId: review.id,
			userId: req.session.userId,
		});
		console.log(upvote);
		return upvote ? upvote.value : null;
	}

	//upvote mutation
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async vote(
		@Arg("reviewId", () => Int) reviewId: number,
		@Arg("value", () => Int) value: number,
		@Ctx() { req }: MyContext
	) {
		// const isUpvote = value !== -1;
		// const finalValue = isUpvote ? 1 : -1;
		const { userId } = req.session;

		//check if user has already voted on a post
		const upvote = await Upvote.findOne({ where: { reviewId, userId } });

		//if user has voted on a post
		//and changing their vote
		if (upvote) {
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                    delete from upvote 
                    where "reviewId" = $1 and "userId" = $2
                `,
					[reviewId, userId]
				);

				await tm.query(
					`
                    update review
                    set score = score - 1
                    where id = $1;
                `,
					[reviewId]
				);
			});
		} else if (!upvote) {
			//they have not voted yet
			//transaction manager, to rollback if there is an error in transaction
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                    insert into upvote ("userId", "reviewId", value)
                    values ($1, $2, $3);
                `,
					[userId, reviewId, value]
				);

				await tm.query(
					`
                    update review
                    set score = score + 1
                    where id = $1;
                `,
					[reviewId]
				);
			});
		}
		return true;
	}

	//get all posts
	@Query(() => PaginatedReviews)
	async reviews(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("text", () => String, { nullable: true }) text: string | null,
		@Arg("movieId", () => Int, { nullable: true }) movieId: number,
		@Arg("orderBy", () => String, {
			defaultValue: "createdAt",
			nullable: true,
		})
		orderBy: string | null,
		@Arg("orderDir", () => String, {
			defaultValue: "DESC",
			nullable: true,
		})
		orderDir: "DESC" | "ASC",
		@Arg("username", () => String, { nullable: true })
		username: string | null
	): Promise<PaginatedReviews> {
		const maxLimit = Math.min(50, limit);
		//+1 to see if there are more posts to return after the initial call to get
		//certain amount of posts
		const maxLimitPlusOne = maxLimit + 1;

		const replacements: any[] = [maxLimitPlusOne];

		//if cursor input is supplied add to replacements[] to use as parameter for get query
		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}

		let user;
		if (username) {
			user = await User.findOne({ where: { username } });
		}

		const qb = getConnection()
			.getRepository(Review)
			.createQueryBuilder("rv")
			.orderBy(`rv."${orderBy}"`, orderDir)
			.take(maxLimitPlusOne);
		if (cursor) {
			qb.where('rv. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}
		if (text) {
			qb.andWhere('rv."text" = :text', { text: text });
		}
		if (movieId) {
			qb.andWhere('rv."movieId" = :movieId', { movieId: movieId });
		}
		if (user) {
			qb.andWhere('rv."creatorId" = :creatorId', { creatorId: user.id });
		}

		const reviews = await qb.getMany();
		return {
			reviews: reviews.slice(0, maxLimit),
			hasMore: reviews.length === maxLimitPlusOne,
		};
	}

	//get specific post
	@Query(() => Review, { nullable: true })
	review(@Arg("id", () => String) id: string): Promise<Review | undefined> {
		return Review.findOne({ where: { referenceId: id } });
	}

	//create post
	@Mutation(() => Review)
	@UseMiddleware(isAuth)
	async createReview(
		@Arg("input") input: ReviewInput,
		@Ctx() { req }: MyContext
	): Promise<Review | null> {
		//if user is not logged in return null
		if (!req.session.userId) {
			return null;
		}

		if (input.tags) {
			const tags = input.tags.split(",");
			tags.forEach(async (tag) => {
				const tagCheck = ReviewTags.findOne({
					where: { text: tag },
				});
				if (await tagCheck) {
					await getConnection()
						.createQueryBuilder()
						.update(ReviewTags)
						.set({
							count: () => '"count" + 1',
						})
						.where("text = :tag", { tag: tag })
						.execute();
				} else {
					await getConnection().transaction(async (tm) => {
						await tm.query(
							`
                                insert into review_tags ("text", "count")
                                values ($1, $2)
                            `,
							[tag, 1]
						);
					});
				}
			});
		}

		await getConnection()
			.createQueryBuilder()
			.update(Films)
			.set({
				watchCount: () => '"watchCount" + 1',
			})
			.where("movieId = :movieId", { movieId: input.movieId })
			.execute();

		return Review.create({
			creatorId: req.session.userId,
			...input,
		}).save();
	}

	//update post (title)
	@Mutation(() => Review, { nullable: true })
	@UseMiddleware(isAuth)
	async updateReview(
		@Arg("referenceId", () => String) referenceId: string,
		@Arg("text") text: string,
		@Ctx() { req }: MyContext
	): Promise<Review | null> {
		const result = await getConnection()
			.createQueryBuilder()
			.update(Review)
			.set({ text })
			.where('referenceId = :referenceId and "creatorId" = :creatorId', {
				referenceId,
				creatorId: req.session.userId,
			})
			.returning("*")
			.execute();

		return result.raw[0];
	}

	//delete post
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteReview(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		//delete posts corresponding votes from vote table
		//delete post from Post table by user Id to ensure only owner can delete

		// non cascade way
		// const post = await Post.findOne(id);
		// if (!post){
		//     return false
		// }
		// if (post.creatorId !== req.session.userId){
		//     throw new Error('Not authorized')
		// }
		// await Upvote.delete({postId: id});
		// await Post.delete({id});
		// return true;

		//cascade way
		//there is object in upvote entity in post relationship eg; onDelete: 'CASCADE'
		await Review.delete({ id, creatorId: req.session.userId });
		return true;
	}
}

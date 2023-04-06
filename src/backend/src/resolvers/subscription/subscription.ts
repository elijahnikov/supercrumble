import { Subscription } from "../../entities/subscription/subscription";
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
import { User } from "../../entities/user/user";
import { MyContext } from "../../types";
import { isAuth } from "../../middleware/isAuth";
import { getConnection } from "typeorm";

@ObjectType()
class PaginatedFollowers {
	@Field(() => [Subscription])
	subscription: Subscription[];

	@Field()
	hasMore: boolean;
}

@ObjectType()
class PaginatedFollowing {
	@Field(() => [Subscription])
	subscription: Subscription[];

	@Field()
	hasMore: boolean;
}

@Resolver(Subscription)
export class SubscriptionResolver {
	@FieldResolver(() => User)
	follower(
		@Root() subscription: Subscription,
		@Ctx() { userLoader }: MyContext
	) {
		return userLoader.load(subscription.userId);
	}

	@FieldResolver(() => User)
	following(
		@Root() subscription: Subscription,
		@Ctx() { userLoader }: MyContext
	) {
		return userLoader.load(subscription.followerId);
	}

	@Query(() => Boolean)
	@UseMiddleware(isAuth)
	async checkIfFollowingUser(
		@Arg("userId", () => Int) userId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		const check = await Subscription.findOne({
			where: { userId: req.session.userId, followerId: userId },
		});
		if (check) return true;
		return false;
	}

	@Query(() => PaginatedFollowers)
	async followers(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("orderBy", () => String, {
			defaultValue: "createdAt",
			nullable: true,
		})
		orderBy: string | null,
		@Arg("orderDir", () => String, { defaultValue: "DESC", nullable: true })
		orderDir: "DESC" | "ASC",
		@Arg("userId", () => Int) userId: number
	): Promise<PaginatedFollowers> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const qb = getConnection()
			.getRepository(Subscription)
			.createQueryBuilder("sub")
			.orderBy(`sub."${orderBy}"`, orderDir)
			.where('sub. "followerId" = :userId', { userId })
			.take(maxLimitPlusOne);
		if (cursor) {
			qb.andWhere('sub. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}

		const followers = await qb.getMany();
		return {
			subscription: followers.slice(0, maxLimit),
			hasMore: followers.length === maxLimitPlusOne,
		};
	}

	@Query(() => PaginatedFollowing)
	async followings(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("orderBy", () => String, {
			defaultValue: "createdAt",
			nullable: true,
		})
		orderBy: string | null,
		@Arg("orderDir", () => String, { defaultValue: "DESC", nullable: true })
		orderDir: "DESC" | "ASC",
		@Arg("userId", () => Int) userId: number
	): Promise<PaginatedFollowing> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const qb = getConnection()
			.getRepository(Subscription)
			.createQueryBuilder("sub")
			.orderBy(`sub."${orderBy}"`, orderDir)
			.where('sub. "userId" = :userId', { userId })
			.take(maxLimitPlusOne);
		if (cursor) {
			qb.andWhere('sub. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}

		const followings = await qb.getMany();
		return {
			subscription: followings.slice(0, maxLimit),
			hasMore: followings.length === maxLimitPlusOne,
		};
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async follow(
		@Arg("userId", () => Int) userId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		const { userId: meId } = req.session;

		const followCheck = await Subscription.findOne({
			where: { followerId: userId, userId: req.session.userId },
		});

		if (followCheck) {
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                        delete from subscription
                        where "followerId" = $1 and "userId" = $2
                    `,
					[userId, meId]
				);

				await tm.query(
					`
                        update "user"
                        set following = following - 1
                        where id = $1
                    `,
					[meId]
				);

				await tm.query(
					`
                        update "user"
                        set followers = followers - 1
                        where id = $1
                    `,
					[userId]
				);
			});
		} else if (!followCheck) {
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                        insert into subscription ("userId", "followerId")
                        values ($1, $2)
                    `,
					[meId, userId]
				);

				await tm.query(
					`
                        update "user"
                        set following = following + 1
                        where id = $1
                    `,
					[meId]
				);

				await tm.query(
					`
                        update "user"
                        set followers = followers + 1
                        where id = $1
                    `,
					[userId]
				);
			});
		}

		return true;
	}
}

import { Watchlist } from "../../entities/watchlist/watchlist";
import {
	Arg,
	Ctx,
	Field,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { User } from "src/entities/user/user";
import { getConnection } from "typeorm";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { AddToWatchlistInput } from "../inputs/AddToWatchlistInput";

@ObjectType()
class PaginatedWatchlist {
	@Field(() => [Watchlist])
	watchlist: Watchlist[];

	@Field()
	hasMore: boolean;
}

@Resolver(Watchlist)
export class WatchlistResolver {
	@Query(() => PaginatedWatchlist)
	async watchlist(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("orderBy", () => String, {
			defaultValue: "createdAt",
			nullable: true,
		})
		orderBy: string | null,
		@Arg("orderDir", () => String, { defaultValue: "DESC", nullable: true })
		orderDir: "DESC" | "ASC",
		@Arg("username", () => String) username: string
	): Promise<PaginatedWatchlist> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const user = await User.findOne({
			where: {
				username: username,
			},
		});

		const userId = user?.id;

		const qb = getConnection()
			.getRepository(Watchlist)
			.createQueryBuilder("wl")
			.orderBy(`wl."${orderBy}"`, orderDir)
			.where('wl. "creatorId" = :userId', {
				userId: userId,
			})
			.take(maxLimitPlusOne);
		if (cursor) {
			qb.andWhere('wl. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}

		const watchlist = await qb.getMany();

		return {
			watchlist: watchlist.slice(0, maxLimit),
			hasMore: watchlist.length === maxLimitPlusOne,
		};
	}

	@Mutation(() => Watchlist, { nullable: true })
	@UseMiddleware(isAuth)
	async addToWatchlist(
		@Arg("input") input: AddToWatchlistInput,
		@Ctx() { req }: MyContext
	): Promise<Watchlist | null> {
		const check = await Watchlist.findOne({
			where: { creatorId: req.session.userId, filmId: input },
		});

		if (check) {
			return null;
		}

		return Watchlist.create({
			creatorId: req.session.userId,
			...input,
		}).save();
	}
}

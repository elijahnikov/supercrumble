import { Watched } from "../../entities/watched/watched";
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
import { MyContext } from "src/types";
import { isAuth } from "../../middleware/isAuth";
import { CreateWatchedInput } from "../inputs/CreateWatchedInput";
import { getConnection } from "typeorm";

@ObjectType()
class PaginatedWatched {
	@Field(() => [Watched])
	watched: Watched[];

	@Field()
	hasMore: boolean;
}

@Resolver(Watched)
export class WatchedResolver {
	@FieldResolver(() => User)
	creator(@Root() watched: Watched, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(watched.creatorId);
	}

	@Query(() => PaginatedWatched)
	async watched(
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
	): Promise<PaginatedWatched> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const user = await User.findOne({
			where: {
				username: username,
			},
		});

		const userId = user?.id;

		const qb = getConnection()
			.getRepository(Watched)
			.createQueryBuilder("wa")
			.orderBy(`wa."${orderBy}"`, orderDir)
			.where('wa. "creatorId" = :userId', {
				userId: userId,
			})
			.take(maxLimitPlusOne);
		if (cursor) {
			qb.andWhere('wa. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}

		const watchedFilms = await qb.getMany();
		return {
			watched: watchedFilms.slice(0, maxLimit),
			hasMore: watchedFilms.length === maxLimitPlusOne,
		};
	}

	@Query(() => Int)
	@UseMiddleware(isAuth)
	async numberOfWatchedByYear(
		@Arg("year", () => String, { nullable: true }) year: string,
		@Ctx() { req }: MyContext
	): Promise<number> {
		const userId = req.session.userId;

		const query = await getConnection().manager.query(
			`
                select * 
                from watched w
                where extract(year from w."createdAt") = $1
                and w."creatorId" = $2
            `,
			[year, userId]
		);
		return query.length;
	}

	@Mutation(() => Watched, { nullable: true })
	@UseMiddleware(isAuth)
	async createWatched(
		@Arg("input") input: CreateWatchedInput,
		@Ctx() { req }: MyContext
	): Promise<Watched | null> {
		const check = await Watched.findOne({
			where: { creatorId: req.session.userId, filmId: input.filmId },
		});
		if (check) {
			return null;
		}

		await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({
				totalFilmsWatched: () => '"totalFilmsWatched" + 1',
			})
			.where("id = :id", { id: req.session.userId })
			.execute();

		return Watched.create({
			creatorId: req.session.userId,
			...input,
		}).save();
	}
}

import { FilmList } from "../../entities/filmList/filmList";
import { FilmListTags } from "../../entities/filmList/filmListTags";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "src/types";
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
import { getConnection } from "typeorm";
import { FilmListInput } from "../inputs/FilmListInput";
import { User } from "../../entities/user/user";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";
import { FilmListUpvote } from "../../entities/filmList/filmListUpvote";
import { nanoid } from "nanoid";

@ObjectType()
class FilmListResponse {
	@Field(() => FilmList, { nullable: true })
	filmList?: FilmList;
}

@ObjectType()
class BatchedListResponse {
	@Field(() => FilmList, { nullable: true })
	filmList?: FilmList;

	@Field(() => [FilmListEntries])
	filmListEntries: FilmListEntries[];

	@Field()
	hasMore: boolean;
}

@ObjectType()
class PaginatedFilmLists {
	@Field(() => [FilmList])
	filmLists: FilmList[];

	@Field()
	hasMore: boolean;
}

@Resolver(FilmList)
export class FilmListResolver {
	@FieldResolver(() => User)
	creator(@Root() filmList: FilmList, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(filmList.creatorId);
	}

	@FieldResolver(() => Int, { nullable: true })
	async voteStatus(
		@Root() filmList: FilmList,
		@Ctx() { filmListUpvoteLoader, req }: MyContext
	) {
		if (!req.session.userId) {
			return null;
		}

		const upvote = await filmListUpvoteLoader.load({
			filmListId: filmList.id,
			userId: req.session.userId,
		});

		return upvote ? upvote.value : null;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async filmListVote(
		@Arg("filmListId", () => String) filmListId: string,
		@Arg("value", () => Int) value: number,
		@Ctx() { req }: MyContext
	) {
		const { userId } = req.session;

		const upvote = await FilmListUpvote.findOne({
			where: { filmListId, userId },
		});

		if (upvote) {
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                    delete from film_list_upvote
                    where "filmListId" = $1 and "userId" = $2
                    `,
					[filmListId, userId]
				);

				await tm.query(
					`
                    update film_list
                    set score = score - 1
                    where id = $1
                    `,
					[filmListId]
				);
			});
		} else if (!upvote) {
			await getConnection().transaction(async (tm) => {
				await tm.query(
					`
                    insert into film_list_upvote ("userId", "filmListId", value)
                    values ($1, $2, $3)
                    `,
					[userId, filmListId, value]
				);

				await tm.query(
					`
                    update film_list
                    set score = score + 1
                    where id = $1
                    `,
					[filmListId]
				);
			});
		}
		return true;
	}

	@Mutation(() => FilmListResponse)
	@UseMiddleware(isAuth)
	async createFilmList(
		@Arg("input") input: FilmListInput,
		@Arg("filmIds", () => [Int]) filmIds: number[],
		@Ctx() { req }: MyContext
	): Promise<FilmListResponse | null> {
		if (!req.session.userId) {
			return null;
		}

		let connection = await getConnection();

		if (input.tags) {
			const tags = input.tags.split(",");
			console.table(tags);
			tags.forEach(async (tag) => {
				console.log(tag);
				const tagCheck = await FilmListTags.findOne({
					where: { text: tag },
				});
				console.log(tagCheck);
				if (tagCheck) {
					await connection
						.createQueryBuilder()
						.update(FilmListTags)
						.set({
							count: () => '"count" + 1',
						})
						.where("text = :tag", { tag: tag })
						.execute();
				} else {
					FilmListTags.create({
						text: tag,
					}).save();
				}
			});
		}

		let uniqueId = nanoid(10);

		let insert = await connection
			.createQueryBuilder()
			.insert()
			.into(FilmList)
			.values({
				id: uniqueId,
				creatorId: req.session.userId,
				...input,
			})
			.returning("*")
			.execute();
		let listId = insert.raw[0].id;
		let filmList = insert.raw[0];

		await connection
			.createQueryBuilder()
			.update(User)
			.set({
				totalListsCreated: () => '"totalListsCreated" + 1',
			})
			.where("id = :id", { id: req.session.userId })
			.execute();

		let filmListEntriesArr: { listId: string; filmId: number }[] = [];
		filmIds.map((film) => {
			filmListEntriesArr.push({ listId, filmId: film });
		});
		await connection
			.createQueryBuilder()
			.insert()
			.into(FilmListEntries)
			.values(filmListEntriesArr)
			.returning("*")
			.execute();

		return {
			filmList,
		};
	}

	@Query(() => BatchedListResponse, { nullable: true })
	async filmList(
		@Arg("id", () => String) id: string,
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string
	): Promise<BatchedListResponse> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const dataSource = getConnection();

		const filmListQuery = dataSource
			.getRepository(FilmList)
			.createQueryBuilder("fl")
			.where('fl."id" = :id', { id });

		const entryQuery = dataSource
			.getRepository(FilmListEntries)
			.createQueryBuilder("fle")
			.take(maxLimitPlusOne)
			.where('fle."listId" = :listId', { listId: id });
		if (cursor) {
			entryQuery.andWhere('fle. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}

		const filmListEntries = await entryQuery.getMany();
		const filmList = await filmListQuery.getOne();

		return {
			filmList,
			filmListEntries: filmListEntries.slice(0, maxLimit),
			hasMore: filmListEntries.length === maxLimitPlusOne,
		};
	}

	@Query(() => PaginatedFilmLists)
	@UseMiddleware(isAuth)
	async filmLists(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("orderBy", () => String, { defaultValue: "score", nullable: true })
		orderBy: string | null,
		@Arg("orderDir", () => String, { defaultValue: "DESC", nullable: true })
		orderDir: "DESC" | "ASC",
		@Arg("dateLimit", () => String, { nullable: true })
		dateLimit: string | null,
		@Arg("tag", () => String, { nullable: true }) tag: string | null,
		@Arg("username", () => String, { nullable: true })
		username: string | null
	): Promise<PaginatedFilmLists> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		let user;
		if (username) {
			user = await User.findOne({ where: { username } });
		}

		const lists = getConnection()
			.getRepository(FilmList)
			.createQueryBuilder("fl")
			.orderBy(`fl."${orderBy}"`, orderDir)
			.take(maxLimitPlusOne);
		if (cursor) {
			lists.where('fl. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}
		if (dateLimit) {
			lists.andWhere('fl. "createdAt" > :dateLimit', {
				dateLimit: new Date(dateLimit),
			});
		}
		if (user) {
			lists.andWhere('fl. "creatorId" = :id', { id: user.id });
		}
		if (tag) {
			lists.andWhere(`',' || fl.tags || ',' LIKE '%,${tag},%'`);
		}

		const listsResults = await lists.getMany();

		return {
			filmLists: listsResults.slice(0, maxLimit),
			hasMore: listsResults.length === maxLimitPlusOne,
		};
	}

	@Mutation(() => Boolean, { nullable: true })
	@UseMiddleware(isAuth)
	async updateFilmList(
		@Arg("id", () => String) id: string,
		@Arg("title") title: string,
		@Arg("description") description: string,
		@Ctx() { req }: MyContext
	): Promise<Boolean | null> {
		await getConnection()
			.createQueryBuilder()
			.update(FilmList)
			.set({ title, description })
			.where('id = :id and "creatorId" = :creatorId', {
				id,
				creatorId: req.session.userId,
			})
			.returning("*")
			.execute();

		return true;
	}
}

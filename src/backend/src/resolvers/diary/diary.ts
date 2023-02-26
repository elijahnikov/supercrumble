import { Diary } from "../../entities/diary/diary";
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
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "src/types";
import { CreateDiaryInput } from "../inputs/CreateDiaryInput";
import { User } from "../../entities/user/user";
import { getTimeRange } from "../../utils/getTimeRange";

@ObjectType()
class PaginatedDiary {
	@Field(() => [Diary])
	diary: Diary[];

	@Field()
	hasMore: boolean;
}

@Resolver(Diary)
export class DiaryResolver {
	@FieldResolver(() => User)
	creator(@Root() diary: Diary, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(diary.creatorId);
	}

	@Query(() => PaginatedDiary)
	async diary(
		@Arg("limit", () => Int, { nullable: true }) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
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
		@Arg("userId", () => Int) userId: number,
		@Arg("month", () => Int, { nullable: true }) month: number,
		@Arg("year", () => Int, { nullable: true }) year: number
	): Promise<PaginatedDiary> {
		const maxLimit = Math.min(50, limit);
		const maxLimitPlusOne = maxLimit + 1;

		const qb = getConnection()
			.getRepository(Diary)
			.createQueryBuilder("d")
			.orderBy(`d."${orderBy}"`, orderDir)
			.take(maxLimitPlusOne)
			.where('d."creatorId" = :userId', { userId });
		if (cursor) {
			qb.andWhere('d. "createdAt" < :cursor', {
				cursor: new Date(parseInt(cursor)),
			});
		}
		if (month && year) {
			let { firstDay, lastDay } = getTimeRange(year, month);

			qb.andWhere('d. "watchedOn" > :firstDay', { firstDay });
			qb.andWhere('d. "watchedOn" < :lastDay', { lastDay });
		}

		const diary = await qb.getMany();
		return {
			diary: diary.slice(0, maxLimit),
			hasMore: diary.length === maxLimitPlusOne,
		};
	}

	@Mutation(() => Diary)
	@UseMiddleware(isAuth)
	async createDiary(
		@Arg("input") input: CreateDiaryInput,
		@Ctx() { req }: MyContext
	): Promise<Diary | null> {
		return Diary.create({
			creatorId: req.session.userId,
			...input,
		}).save();
	}
}

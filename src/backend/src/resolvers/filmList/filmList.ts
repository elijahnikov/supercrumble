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
import { User } from "../../entities/user";
import { FilmListEntries } from "../../entities/filmList/filmListEntries";

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

@Resolver(FilmList)
export class FilmListResolver {
    @FieldResolver(() => User)
    creator(@Root() filmList: FilmList, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(filmList.creatorId);
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

        if (input.tags) {
            const tags = input.tags.split(",");
            tags.forEach(async (tag) => {
                const tagCheck = FilmListTags.findOne({
                    where: { text: tag },
                });
                if (await tagCheck) {
                    await getConnection()
                        .createQueryBuilder()
                        .update(FilmListTags)
                        .set({
                            count: () => '"count" + 1',
                        })
                        .where("text = :tag", { tag: tag })
                        .execute();
                } else {
                    await getConnection().transaction(async (tm) => {
                        await tm.query(
                            `
                                insert into film_tags ("text", "count")
                                values ($1, $2)
                            `,
                            [tag, 1]
                        );
                    });
                }
            });
        }

        let insert = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(FilmList)
            .values({ creatorId: req.session.userId, ...input })
            .returning("*")
            .execute();
        let listId = insert.raw[0].id;
        let filmList = insert.raw[0];

        let filmListEntriesArr: { listId: number; filmId: number }[] = [];
        filmIds.map((film) => {
            filmListEntriesArr.push({ listId, filmId: film });
        });
        await getConnection()
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
        @Arg("id", () => Int) id: number,
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
}

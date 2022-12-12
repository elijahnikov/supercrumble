import { FilmListEntries } from "../../entities/filmList/filmListEntries";
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
import { FilmListEntriesInput } from "../inputs/FilmListEntriesInput";
import { Films } from "../../entities/film/films";
import { FilmList } from "../../entities/filmList/filmList";

@ObjectType()
class PaginatedFilmListEntries {
    @Field(() => [FilmListEntries])
    filmListEntries: FilmListEntries[];

    @Field()
    hasMore: boolean;
}

@Resolver(FilmListEntries)
export class FilmListEntriesResolver {
    @FieldResolver(() => Films)
    film(
        @Root() filmListEntries: FilmListEntries,
        @Ctx() { filmLoader }: MyContext
    ) {
        return filmLoader.load(filmListEntries.filmId);
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async createEntries(
        @Arg("input", () => [FilmListEntriesInput])
        input: FilmListEntriesInput[],
        @Ctx() { req }: MyContext
    ): Promise<boolean | null> {
        if (!req.session.userId) {
            return null;
        }

        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(FilmListEntries)
                .values(input)
                .returning("*")
                .execute();
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    @Query(() => PaginatedFilmListEntries)
    async filmListEntries(
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string,
        @Arg("listId", () => Int) listId: number
    ): Promise<PaginatedFilmListEntries> {
        const maxLimit = Math.min(50, limit);
        const maxLimitPlusOne = maxLimit + 1;
        const replacements: any[] = [maxLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const qb = getConnection()
            .getRepository(FilmListEntries)
            .createQueryBuilder("fle")
            .take(maxLimitPlusOne)
            .where('fle."listId" = :listId', { listId: listId });
        if (cursor) {
            qb.andWhere('fle. "createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const filmListEntries = await qb.getMany();
        return {
            filmListEntries: filmListEntries.slice(0, maxLimit),
            hasMore: filmListEntries.length === maxLimitPlusOne,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteFilmListEntry(
        @Arg("id", () => Int) id: number,
        @Arg("filmListId", () => String) filmListId: number
    ): Promise<boolean> {
        const filmList = await FilmList.findOne({ where: { id: filmListId } });
        const filmListEntry = await FilmListEntries.findOne({
            where: { id: id },
        });

        if (!filmList || !filmListEntry) {
            return false;
        }

        await FilmListEntries.delete({ id, listId: filmList.id });

        return true;
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async addEntryToFilmList(
        @Arg("listId", () => String) listId: string,
        @Arg("filmId", () => Int) filmId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean | null> {
        if (!req.session.userId) {
            return null;
        }

        let filmListEntry = await FilmListEntries.findOne({
            where: { filmId, listId },
        });

        if (filmListEntry) {
            return false;
        }

        await FilmListEntries.create({
            filmId,
            listId,
        }).save();

        return true;
    }
}

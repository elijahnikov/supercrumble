import { FilmListTags } from "../../entities/filmList/filmListTags";
import {
    Arg,
    Field,
    Int,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { isAuth } from "../../middleware/isAuth";
import { getConnection } from "typeorm";

@ObjectType()
class PaginatedFilmListTags {
    @Field(() => [FilmListTags])
    filmListTags: FilmListTags[];

    @Field()
    hasMore: boolean;
}

@Resolver(FilmListTags)
export class FilmListTagsResolver {
    @Query(() => PaginatedFilmListTags)
    @UseMiddleware(isAuth)
    async filmListTags(
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedFilmListTags> {
        const maxLimit = Math.min(50, limit);
        const maxLimitPlusOne = maxLimit + 1;

        const tags = getConnection()
            .getRepository(FilmListTags)
            .createQueryBuilder("flt")
            .orderBy('flt."count"', "DESC")
            .take(maxLimitPlusOne);
        if (cursor) {
            tags.where('flt. "createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const filmListTagsResults = await tags.getMany();

        return {
            filmListTags: filmListTagsResults.slice(0, maxLimit),
            hasMore: filmListTagsResults.length === maxLimitPlusOne,
        };
    }
}

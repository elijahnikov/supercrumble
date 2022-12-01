import { FilmTags } from "../../entities/film/filmTags";
import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class GetFilmTags {
    @Field(() => [FilmTags])
    tags: FilmTags[];
}

@Resolver()
export class FilmTagsResolver {
    //get film tags
    @Query(() => FilmTags, { nullable: true })
    async tags(
        @Arg("limit", () => Int, { nullable: true }) limit: number
    ): Promise<GetFilmTags> {
        const qb = getConnection()
            .getRepository(FilmTags)
            .createQueryBuilder("ft")
            .orderBy('rv."count"', "DESC")
            .take(limit);

        const tags = await qb.getMany();
        return {
            tags,
        };
    }
}

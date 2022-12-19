import { ReviewTags } from "../../entities/review/reviewTags";
import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class GetFilmTags {
    @Field(() => [ReviewTags])
    tags: ReviewTags[];
}

@Resolver()
export class ReviewTagsResolver {
    //get film tags
    @Query(() => ReviewTags, { nullable: true })
    async tags(
        @Arg("limit", () => Int, { nullable: true }) limit: number
    ): Promise<GetFilmTags> {
        const qb = getConnection()
            .getRepository(ReviewTags)
            .createQueryBuilder("ft")
            .orderBy('rv."count"', "DESC")
            .take(limit);

        const tags = await qb.getMany();
        return {
            tags,
        };
    }
}

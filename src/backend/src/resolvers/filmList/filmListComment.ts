import { FilmListComment } from "../../entities/filmList/filmListComment";
import { User } from "../../entities/user";
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
import { ReviewComment } from "../../entities/reviewComment";
import { MyContext } from "../../types";
import { isAuth } from "../../middleware/isAuth";
import { FilmListCommentInput } from "../inputs/FilmListCommentInput";
import { getConnection } from "typeorm";
import { FilmList } from "../../entities/filmList/filmList";

@ObjectType()
class PaginatedFilmListComments {
    @Field(() => [FilmListComment])
    filmListComments: FilmListComment[];

    @Field()
    hasMore: boolean;
}

@Resolver(FilmListComment)
export class FilmListCommentResolver {
    @FieldResolver(() => User)
    creator(
        @Root() reviewComment: ReviewComment,
        @Ctx() { userLoader }: MyContext
    ) {
        return userLoader.load(reviewComment.creatorId);
    }

    @Mutation(() => FilmListComment)
    @UseMiddleware(isAuth)
    async createFilmListComment(
        @Arg("input") input: FilmListCommentInput,
        @Ctx() { req }: MyContext
    ): Promise<FilmListComment | null> {
        if (!req.session.userId) {
            return null;
        }

        await getConnection()
            .createQueryBuilder()
            .update(FilmList)
            .set({
                noOfComments: () => '"noOfComments" + 1',
            })
            .where("id = :id", { id: input.filmListId })
            .execute();

        return FilmListComment.create({
            text: input.text,
            filmListId: input.filmListId,
            creatorId: req.session.userId,
        }).save();
    }

    @Query(() => PaginatedFilmListComments)
    async filmListComments(
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Arg("filmListId", () => String) filmListId: string,
        @Arg("order", () => String, { nullable: true, defaultValue: "DESC" })
        order: "ASC" | "DESC" | undefined
    ): Promise<PaginatedFilmListComments> {
        const maxLimit = Math.min(50, limit);
        const maxLimitPlusOne = maxLimit + 1;

        const qb = getConnection()
            .getRepository(FilmListComment)
            .createQueryBuilder("flc")
            .orderBy('flc."createdAt"', order)
            .take(maxLimitPlusOne)
            .where('flc."filmListId" = :filmListId', { filmListId });
        if (cursor) {
            qb.andWhere('flc. "createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const filmListComments = await qb.getMany();

        return {
            filmListComments: filmListComments.slice(0, maxLimit),
            hasMore: filmListComments.length === maxLimitPlusOne,
        };
    }
}

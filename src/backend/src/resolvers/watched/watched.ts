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
        @Arg("orderDir", () => String, {
            defaultValue: "DESC",
            nullable: true,
        })
        orderDir: "DESC" | "ASC",
        @Arg("userId", () => Int) userId: number
    ): Promise<PaginatedWatched> {
        const maxLimit = Math.min(50, limit);
        const maxLimitPlusOne = maxLimit + 1;

        const qb = getConnection()
            .getRepository(Watched)
            .createQueryBuilder("w")
            .orderBy(`w."${orderBy}"`, orderDir)
            .take(maxLimitPlusOne)
            .where('w."creatorId" = :userId', { userId });
        if (cursor) {
            qb.where('w. "createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const watched = await qb.getMany();
        return {
            watched: watched.slice(0, maxLimit),
            hasMore: watched.length === maxLimitPlusOne,
        };
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
        return Watched.create({
            creatorId: req.session.userId,
            ...input,
        }).save();
    }
}

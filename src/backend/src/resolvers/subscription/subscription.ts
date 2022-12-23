import { Subscription } from "../../entities/subscription/subscription";
import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/user/user";
import { MyContext } from "../../types";
import { isAuth } from "../../middleware/isAuth";
import { getConnection } from "typeorm";

@Resolver(Subscription)
export class SubscriptionResolver {
    @FieldResolver(() => User)
    follower(
        @Root() subscription: Subscription,
        @Ctx() { userLoader }: MyContext
    ) {
        return userLoader.load(subscription.followerId);
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async checkIfFollowingUser(
        @Arg("userId", () => Int) userId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const check = await Subscription.findOne({
            where: { userId: req.session.userId, followerId: userId },
        });
        if (check) return true;
        return false;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async follow(
        @Arg("userId", () => Int) userId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        const { userId: meId } = req.session;

        const followCheck = await Subscription.findOne({
            where: { followerId: userId },
        });

        if (followCheck) {
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                        delete from subscription
                        where "followerId" = $1 and "userId" = $2
                    `,
                    [userId, meId]
                );

                await tm.query(
                    `
                        update "user"
                        set following = following - 1
                        where id = $1
                    `,
                    [meId]
                );

                await tm.query(
                    `
                        update "user"
                        set followers = followers - 1
                        where id = $1
                    `,
                    [userId]
                );
            });
        } else if (!followCheck) {
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                        insert into subscription ("userId", "followerId")
                        values ($1, $2)
                    `,
                    [meId, userId]
                );

                await tm.query(
                    `
                        update "user"
                        set following = following + 1
                        where id = $1
                    `,
                    [meId]
                );

                await tm.query(
                    `
                        update "user"
                        set followers = followers + 1
                        where id = $1
                    `,
                    [userId]
                );
            });
        }

        return true;
    }
}

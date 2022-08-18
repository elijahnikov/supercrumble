import { Films } from "../entities/films";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { FilmInput } from "./inputs/FilmInput";
import { getConnection } from "typeorm";

@Resolver()
export class FilmsResolver {
    @Mutation(() => Films, { nullable: true })
    @UseMiddleware(isAuth)
    async createFilm(
        @Arg("input") input: FilmInput,
        @Ctx() { req }: MyContext
    ): Promise<Films | null> {
        if (!req.session.userId) {
            return null;
        }
        const check = await Films.findOne({
            where: { movieId: input.movieId },
        });

        await getConnection()
            .createQueryBuilder()
            .update(Films)
            .set({
                watchCount: () => '"watchCount" + 1',
            })
            .where("movieId = :movieId", { movieId: input.movieId })
            .execute();

        if (check) {
            return null;
        }

        return Films.create({
            ...input,
        }).save();
    }
}

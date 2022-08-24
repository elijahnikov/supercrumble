import { Films } from "../entities/films";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { FilmInput } from "./inputs/FilmInput";

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

        if (check) {
            return null;
        }

        return Films.create({
            ...input,
        }).save();
    }

    @Query(() => Films, { nullable: true })
    film(
        @Arg("movieId", () => Int) movieId: number
    ): Promise<Films | undefined> {
        return Films.findOne({ where: { movieId: movieId } });
    }
}

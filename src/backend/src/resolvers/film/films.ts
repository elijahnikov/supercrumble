import { Films } from "../../entities/film/films";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { isAuth } from "../../middleware/isAuth";
import { MyContext } from "../../types";
import { FilmInput } from "../inputs/FilmInput";

@Resolver()
export class FilmsResolver {
    //insert new film into table when user reviews, used to store metadata about film
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

    //get specific film by id
    @Query(() => Films, { nullable: true })
    film(
        @Arg("movieId", () => Int) movieId: number
    ): Promise<Films | undefined> {
        return Films.findOne({ where: { movieId: movieId } });
    }
}

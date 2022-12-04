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
import { getConnection } from "typeorm";

@Resolver(Films)
export class FilmsResolver {
    //insert new film into table when user reviews, used to store metadata about film
    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async createFilm(
        @Arg("input", () => [FilmInput]) input: FilmInput[],
        @Ctx() { req }: MyContext
    ): Promise<boolean | null> {
        if (!req.session.userId) {
            return null;
        }
        const check = await Films.find({
            where: input,
        });

        if (check.length > 0) {
            return null;
        }

        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Films)
                .values(input)
                .returning("*")
                .execute();
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    //get specific film by id
    @Query(() => Films, { nullable: true })
    film(
        @Arg("movieId", () => Int) movieId: number
    ): Promise<Films | undefined> {
        return Films.findOne({ where: { movieId: movieId } });
    }
}

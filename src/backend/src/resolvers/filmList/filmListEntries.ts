import { FilmListEntries } from "src/entities/filmList/filmListEntries";
import { isAuth } from "src/middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { FilmListEntriesInput } from "../inputs/FilmListEntriesInput";

@Resolver(FilmListEntries)
export class FilmListEntriesResolver {
    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async createEntries(
        @Arg("input", () => [FilmListEntriesInput])
        input: FilmListEntriesInput[],
        @Ctx() { req }: MyContext
    ): Promise<boolean | null> {
        if (!req.session.userId) {
            return null;
        }

        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(FilmListEntries)
                .values(input)
                .returning("*")
                .execute();
        } catch (err) {
            console.log(err);
        }

        return true;
    }
}

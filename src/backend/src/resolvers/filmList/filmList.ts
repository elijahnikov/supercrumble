import { FilmList } from "src/entities/filmList/filmList";
import { FilmListTags } from "src/entities/filmList/filmListTags";
import { isAuth } from "src/middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { FilmListInput } from "../inputs/FilmListInput";

@Resolver(FilmList)
export class FilmListResolver {
    @Mutation(() => FilmList)
    @UseMiddleware(isAuth)
    async createFilmList(
        @Arg("input") input: FilmListInput,
        @Ctx() { req }: MyContext
    ): Promise<FilmList | null> {
        if (!req.session.userId) {
            return null;
        }

        if (input.tags) {
            const tags = input.tags.split(",");
            tags.forEach(async (tag) => {
                const tagCheck = FilmListTags.findOne({
                    where: { text: tag },
                });
                if (await tagCheck) {
                    await getConnection()
                        .createQueryBuilder()
                        .update(FilmListTags)
                        .set({
                            count: () => '"count" + 1',
                        })
                        .where("text = :tag", { tag: tag })
                        .execute();
                } else {
                    await getConnection().transaction(async (tm) => {
                        await tm.query(
                            `
                                insert into film_tags ("text", "count")
                                values ($1, $2)
                            `,
                            [tag, 1]
                        );
                    });
                }
            });
        }

        return FilmList.create({
            creatorId: req.session.userId,
            ...input,
        });
    }
}

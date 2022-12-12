import DataLoader from "dataloader";
import { FilmListUpvote } from "../../entities/filmList/filmListUpvote";

export const createFilmListUpvoteLoader = () =>
    new DataLoader<
        { filmListId: string; userId: number },
        FilmListUpvote | null
    >(async (keys) => {
        const upvotes = await FilmListUpvote.findByIds(keys as any);
        const upvoteIdsToUpvote: Record<string, FilmListUpvote> = {};
        upvotes.forEach((upvote) => {
            upvoteIdsToUpvote[`${upvote.userId}|${upvote.filmListId}`] = upvote;
        });
        return keys.map(
            (key) => upvoteIdsToUpvote[`${key.userId}|${key.filmListId}`]
        );
    });

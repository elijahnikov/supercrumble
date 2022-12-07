import DataLoader from "dataloader";
import { Films } from "../../entities/film/films";

export const createFilmLoader = () =>
    new DataLoader<number, Films>(async (movieIds) => {
        const movies = await Films.findByIds(movieIds as number[]);
        console.log({ movies });
        const movieIdToMovie: Record<number, Films> = {};
        movies.forEach((u) => {
            movieIdToMovie[u.movieId] = u;
        });
        return movieIds.map((movieId) => movieIdToMovie[movieId]);
    });

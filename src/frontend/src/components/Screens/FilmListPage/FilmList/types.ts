export type FilmListEntriesType = {
    __typename?: 'FilmListEntries';
    id: number;
    filmId: number;
    listId: string;
    createdAt: string;
    updatedAt: string;
    film: {
        __typename?: 'Films';
        movieId: number;
        movieTitle: string;
        overview?: string | null;
        posterPath?: string | null;
        backdropPath?: string | null;
        releaseDate: string;
        watchCount: number;
        likeCount: number;
        listCount: number;
    };
};

export type FilmListDataType = {
    creator: {
        __typename: string;
        displayName: string;
        id: number;
        username: string;
        avatar: string;
    };
    creatorId: number;
    entries: Array<{
        id: number;
        listId: string;
        __typename: string;
        film: {
            movieId: number;
            movieTitle: string;
            posterPath: string;
            __typename: string;
        };
    }>;
    id: string;
    score: number;
    noOfComments: number;
    title: string;
    __typename: string;
};

export type FilmListEntryType = {
    id: number;
    listId: string;
    __typename: string;
    film: {
        movieId: number;
        movieTitle: string;
        posterPath: string;
        __typename: string;
    };
};

export type FilmListDataType = {
    __typename?: 'FilmList';
    id: string;
    title: string;
    score: number;
    noOfComments: number;
    filmOnePosterPath?: string | null;
    filmTwoPosterPath?: string | null;
    filmThreePosterPath?: string | null;
    filmFourPosterPath?: string | null;
    filmFivePosterPath?: string | null;
    creatorId: number;
    creator: {
        __typename?: 'User';
        id: number;
        username: string;
        displayName?: string | null;
        avatar?: string | null;
    };
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

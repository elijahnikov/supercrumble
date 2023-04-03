export type FilmListType = {
    __typename?: 'FilmList';
    id: string;
    title: string;
    description?: string | null;
    score: number;
    noOfComments: number;
    numberOfFilms: number;
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

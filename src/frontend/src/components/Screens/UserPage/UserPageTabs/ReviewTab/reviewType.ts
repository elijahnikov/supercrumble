export type ReviewType = {
    __typename?: 'Review';
    id: number;
    referenceId: string;
    movieId: number;
    text: string;
    movie_poster: string;
    backdrop: string;
    movie_title: string;
    movie_release_year: number;
    ratingGiven: number;
    score: number;
    watchedOn?: string | null;
    containsSpoilers: boolean;
    tags: string;
    createdAt: string;
    updatedAt: string;
    voteStatus?: number | null;
    noOfComments: number;
    creator: {
        __typename?: 'User';
        id: number;
        username: string;
        displayName?: string | null;
        avatar?: string | null;
    };
};

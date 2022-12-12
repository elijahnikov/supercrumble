export type FilmListType = {
    __typename?: 'BatchedListResponse';
    hasMore: boolean;
    filmList?: {
        __typename?: 'FilmList';
        id: string;
        title: string;
        description?: string | null;
        tags: string;
        voteStatus?: number | null;
        score: number;
        noOfComments: number;
        creatorId: number;
        createdAt: string;
        updatedAt: string;
        creator: {
            __typename?: 'User';
            id: number;
            username: string;
            displayName?: string | null;
            avatar?: string | null;
        };
    } | null;
    filmListEntries: Array<{
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
    }>;
};

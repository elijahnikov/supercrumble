import { useFilmListsQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { useRouter } from 'next/router';

interface ListsTabProps {}

interface FilmListProps {
    filmList: {
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
}

const ListsTab = ({}: ListsTabProps) => {
    const username = getUsername();

    const { data, loading, error, fetchMore, variables } = useFilmListsQuery({
        variables: {
            limit: 10,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    if (!data) {
        return <h1 className='text-white'>no data found</h1>;
    }

    return (
        <div>
            {loading && <p>loading...</p>}
            {!loading && data.filmLists.filmLists.length > 0 ? (
                <div>
                    <div>
                        {data &&
                            data.filmLists.filmLists.map((filmList, index) => (
                                <FilmList filmList={filmList} key={index} />
                            ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

const FilmList = ({ filmList }: FilmListProps) => {
    const router = useRouter();

    return <div>{filmList.title}</div>;
};

export default ListsTab;

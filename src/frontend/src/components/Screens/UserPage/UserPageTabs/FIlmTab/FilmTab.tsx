import Button from '@/components/Common/Button/Button';
import { useWatchedQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { formatForURL } from '@/utils/url/formatForURL';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { filmTabs } from '../filmTabs';
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';

type FilmTabType = {
    id: number;
    title: string;
    value: string;
    url: string;
};

interface FilmTabProps {}

interface FilmProps {
    poster: string;
    rating: number;
    filmTitle: string;
    filmId: number;
}

const FilmTab = ({}: FilmTabProps) => {
    const username = getUsername();
    const router = useRouter();

    const { data, loading, error, fetchMore, variables } = useWatchedQuery({
        variables: {
            limit: 10,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    return (
        <div>
            <SecondaryUserPageTabs />
            <div className=''>
                {loading && <p>loading...</p>}
                <div className='grid w-[100%] grid-cols-10 gap-2'>
                    {data &&
                        data.watched.watched.map((watched) => (
                            <Film
                                key={watched.filmId}
                                filmId={watched.filmId}
                                filmTitle={watched.filmTitle}
                                poster={watched.posterPath}
                                rating={watched.ratingGiven}
                            />
                        ))}
                </div>
                {data && data.watched.hasMore ? (
                    <div>
                        <Button
                            onClick={() =>
                                fetchMore({
                                    variables: {
                                        limit: variables?.limit,
                                        cursor: data.watched.watched[
                                            data.watched.watched.length - 1
                                        ].createdAt,
                                    },
                                })
                            }
                        >
                            Load more
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const Film = ({ poster, rating, filmId, filmTitle }: FilmProps) => {
    return (
        <div className='mb-2 flex'>
            {poster ? (
                <NextLink
                    href='/film/[id]'
                    as={`/film/${formatForURL(filmTitle.toString())}-${filmId}`}
                >
                    <img
                        className={`rounded-md hover:outline hover:outline-superRed `}
                        src={
                            poster
                                ? `https://image.tmdb.org/t/p/w500${poster}`
                                : undefined
                        }
                    />
                </NextLink>
            ) : (
                <p>?</p>
            )}
        </div>
    );
};

export default FilmTab;

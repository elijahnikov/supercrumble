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

    const { data, loading, error } = useWatchedQuery({
        variables: {
            limit: 50,
            orderBy: 'createdAt',
            username,
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
                                filmId={watched.filmId}
                                filmTitle={watched.filmTitle}
                                poster={watched.posterPath}
                                rating={watched.ratingGiven}
                            />
                        ))}
                </div>
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

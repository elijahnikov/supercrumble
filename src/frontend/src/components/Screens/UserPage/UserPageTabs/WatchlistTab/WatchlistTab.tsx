import { useWatchlistQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { formatForURL } from '@/utils/url/formatForURL';
import NextLink from 'next/link';
import { BsEye, BsEyeFill } from 'react-icons/bs';

interface WatchlistTabProps {}

interface FilmProps {
    poster: string;
    filmId: number;
    filmTitle: string;
}

const WatchlistTab = ({}: WatchlistTabProps) => {
    const username = getUsername();

    const { data, loading, error, fetchMore, variables } = useWatchlistQuery({
        variables: {
            limit: 20,
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
            {!loading && data.watchlist.watchlist.length > 0 ? (
                <div className='grid w-[100%] grid-cols-5 gap-2'>
                    {data.watchlist.watchlist.map((watchlist, index) => (
                        <Film
                            key={index}
                            filmId={watchlist.filmId}
                            filmTitle={watchlist.filmTitle}
                            poster={watchlist.posterPath}
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className='mt-[20px] h-[150px] rounded-md border border-slate-800 text-center'>
                        <div className='mt-[30px] w-full justify-center text-center'>
                            <div className='inline w-full text-slate-400'>
                                <h4 className='text-white'>
                                    Uh oh! No films found in your watchlist.
                                </h4>
                                <p className='inline'>
                                    Add films to your watchlist by clicking the{' '}
                                </p>
                                <BsEyeFill className='inline' />
                                <p className='inline'> icon</p>
                                <p>when browsing.</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const Film = ({ poster, filmId, filmTitle }: FilmProps) => {
    return (
        <div className='mb-2 flex'>
            {poster ? (
                <NextLink
                    href={'/film/[id]'}
                    as={`/film/${formatForURL(filmTitle.toString())}-${filmId}`}
                >
                    <img
                        className='rounded-md hover:outline hover:outline-superRed'
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

export default WatchlistTab;

// Components
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';
import Button from '@/components/Common/Button/Button';

// Router
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// Utils
import { getUsername } from '@/utils/getUsername';
import { formatForURL } from '@/utils/url/formatForURL';
import { useWatchedQuery } from '@/generated/graphql';

type FilmTabType = {
    id: number;
    title: string;
    value: string;
    url: string;
};

interface FilmTabProps {}

interface FilmProps {
    poster: string;
    rating?: number | null;
    filmTitle: string;
    filmId: number;
}

const FilmTab = ({}: FilmTabProps) => {
    const username = getUsername();
    const router = useRouter();

    const { data, loading, error, fetchMore, variables } = useWatchedQuery({
        variables: {
            limit: 50,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    if (!data) {
        return <h1 className='text-white'>no data found</h1>;
    }

    return (
        // <div>
        //     <SecondaryUserPageTabs />
        //     <div className=''>
        //         {loading && <p>loading...</p>}
        //         <div className='grid w-[100%] grid-cols-10 gap-2'>
        //             {!loading &&
        //                 data &&
        //                 data.watched.watched.map((watched) => (
        //                     <Film
        //                         key={watched.filmId}
        //                         filmId={watched.filmId}
        //                         filmTitle={watched.filmTitle}
        //                         poster={watched.posterPath}
        //                         rating={watched.ratingGiven}
        //                     />
        //                 ))}
        //         </div>
        //         {!loading && data && data.watched.hasMore ? (
        //             <div>
        //                 <Button
        //                     onClick={() =>
        //                         fetchMore({
        //                             variables: {
        //                                 limit: variables?.limit,
        //                                 cursor: data.watched.watched[
        //                                     data.watched.watched.length - 1
        //                                 ].createdAt,
        //                             },
        //                         })
        //                     }
        //                 >
        //                     Load more
        //                 </Button>
        //             </div>
        //         ) : null}
        //     </div>
        // </div>
        <>
            <div>
                <SecondaryUserPageTabs />
                <br />
                <div className='mt-[100px] mb-[100px]'>
                    {loading && <p>loading...</p>}
                    {data && data?.watched.watched.length > 0 ? (
                        <div className='grid w-[100%] grid-cols-10 gap-2'>
                            {data.watched.watched.map((watched, index) => (
                                <Film
                                    key={index}
                                    filmId={watched.filmId}
                                    filmTitle={watched.filmTitle}
                                    poster={watched.posterPath}
                                    rating={watched.ratingGiven}
                                />
                            ))}
                            {!loading && data && data.watched.hasMore && (
                                <div>
                                    <Button
                                        onClick={() =>
                                            fetchMore({
                                                variables: {
                                                    limit: variables?.limit,
                                                    cursor: data.watched
                                                        .watched[
                                                        data.watched.watched
                                                            .length - 1
                                                    ].createdAt,
                                                },
                                            })
                                        }
                                    >
                                        Load more
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className='mt-[20px] h-[120px] rounded-md border border-slate-800 text-center'>
                                <div className='mt-[30px] w-full justify-center text-center'>
                                    <div className='inline w-full text-slate-400'>
                                        <h4 className='text-white'>
                                            Looks like you haven't logged any
                                            films on SuperCrumble
                                        </h4>
                                        <p className='inline'>
                                            Review films or simply add to your
                                            log and they'll show up here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
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

import Button from '@/components/Common/Button/Button';
import Layout from '@/components/Common/Layout/Layout';
import CreateReviewModal from '@/components/Common/CreateReviewModal/CreateReviewModal';
import FilmActions from '@/components/Screens/FilmPage/components/FilmActions/FilmActions';
import FilmDetailTabs from '@/components/Screens/FilmPage/components/FilmDetailTabs/FilmDetailTabs';
import FilmStats from '@/components/Screens/FilmPage/components/FilmStats/FilmStats';
import RelatedFilms from '@/components/Screens/FilmPage/components/RelatedFilms/RelatedFilms';
import ReviewSection from '@/components/Screens/FilmPage/components/ReviewSection/ReviewSection';
import SimilarFilms from '@/components/Screens/FilmPage/components/SimilarFilms/SimilarFilms';
import TertiaryInfo from '@/components/Screens/FilmPage/components/TertiaryInfo/TertiaryInfo';
import { useFilmLazyQuery } from '@/generated/graphql';
import { getFromURL } from '@/utils/url/getFromURL';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import { useState, useEffect, UIEventHandler, useRef } from 'react';

interface FilmPageProps {}

const FilmPage = ({}: FilmPageProps) => {
    const [movieData, setMovieData] = useState<any>({});
    const [showMoreOverview, setShowMoreOverview] = useState<boolean>(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [fetchLoading, setFetchLoading] = useState<boolean>(false);
    const [filmId, setFilmId] = useState<string>('');
    const imageRef = useRef(null);
    const router = useRouter();

    const [getFilm, { data: extraMovieData }] = useFilmLazyQuery({
        variables: {
            movieId: movieData.id,
        },
    });

    const getMovieDetails = async () => {
        setFetchLoading(true);
        try {
            if (filmId) {
                const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos,images,credits,alternative_titles,themes`;
                const response = await fetch(url);
                const data = await response.json();
                setMovieData(data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setFetchLoading(false);
        }
    };

    const getFilmId = () => {
        let filmId =
            typeof router.query.id === 'string'
                ? getFromURL(router.query.id)
                : '';
        setFilmId(filmId);
    };

    useEffect(() => {
        setFetchLoading(true);
        getFilmId();
    }, []);

    useEffect(() => {
        getMovieDetails();
    }, [filmId]);

    useEffect(() => {
        if (movieData.id) {
            getFilm({
                variables: {
                    movieId: movieData.id,
                },
            });
        }
    }, [movieData]);

    const onScroll = (e: any) => {
        if (imageRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = imageRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log('test');
            }
        }
    };

    if (!movieData || movieData.success === false) {
        return (
            <Layout showNavBar={true} showSearch={true}>
                <div className='mb-20 flex justify-center'>
                    <div className='pageFrame h-[300px] text-center'>
                        <h1 className='mt-[100px]'>:/</h1>
                        <h1 className='mt-[5px]'>Film not found.</h1>
                        <p
                            onClick={() => router.back()}
                            className='cursor-pointer text-superRed hover:underline'
                        >
                            Go back
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
        >
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    {fetchLoading || movieData.success === false ? (
                        <div>loading...</div>
                    ) : (
                        <>
                            <div
                                ref={imageRef}
                                onScroll={onScroll}
                                className='mt-[100px] p-7'
                            >
                                <br />
                                <div className='float-left min-h-[300vh] w-[25%] text-center'>
                                    <div className='sticky top-0 pt-5'>
                                        <div>
                                            <img
                                                className='mb-5 inline aspect-auto h-[300px] cursor-pointer rounded-md '
                                                src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                                            />
                                        </div>
                                        <CreateReviewModal
                                            open={reviewOpen}
                                            setOpen={setReviewOpen}
                                            film={{
                                                id: movieData.id,
                                                originalTitle:
                                                    movieData.original_title,
                                                releaseDate:
                                                    movieData.release_date,
                                                posterPath:
                                                    movieData.poster_path,
                                                overview: movieData.overview,
                                                backdropPath:
                                                    movieData.backdrop_path,
                                                show: true,
                                            }}
                                        />
                                        <div className='mt-5'>
                                            <FilmActions
                                                filmId={parseInt(movieData.id)}
                                                filmTitle={
                                                    movieData.original_title
                                                }
                                                posterPath={
                                                    movieData.poster_path
                                                }
                                            />
                                        </div>
                                        <div className='inline-block'>
                                            <FilmStats
                                                extraMovieData={extraMovieData}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* FILM DETAILS */}
                                <div className='float-left mt-[180px] ml-5 w-[720px]'>
                                    <h4 className='mb-1 font-semibold text-superRed'>
                                        {movieData.release_date
                                            ? movieData.release_date.split(
                                                  '-'
                                              )[0]
                                            : ''}
                                    </h4>
                                    <span className='inline break-words text-[34px] font-bold text-white'>
                                        {movieData.original_title}
                                    </span>

                                    <div className='mt-5 text-sm'>
                                        <p className='inline text-gray-400'>
                                            Directed by{' '}
                                        </p>
                                        <p className='inline cursor-pointer underline'>
                                            {movieData
                                                ? movieData?.credits?.crew
                                                      .filter((crew: any) => {
                                                          return (
                                                              crew.job ===
                                                              'Director'
                                                          );
                                                      })
                                                      .map((director: any) => (
                                                          <p
                                                              key={
                                                                  director.name
                                                              }
                                                              className='mr-1 inline'
                                                          >
                                                              {director.name}{' '}
                                                          </p>
                                                      ))
                                                : null}
                                        </p>
                                    </div>
                                    <div className='mt-5'>
                                        <p className='text-xs uppercase text-gray-400'>
                                            {movieData.tagline}
                                        </p>
                                    </div>

                                    <p className='mt-2 text-sm'>
                                        {movieData.overview}
                                    </p>

                                    <FilmDetailTabs
                                        cast={movieData?.credits?.cast}
                                        crew={movieData?.credits?.crew}
                                        companies={
                                            movieData?.production_companies
                                        }
                                        countries={
                                            movieData?.production_countries
                                        }
                                        languages={movieData?.spoken_languages}
                                        alternativeTitles={
                                            movieData?.alternative_titles
                                                ?.titles
                                        }
                                        genres={movieData?.genres}
                                    />
                                    <TertiaryInfo
                                        runtime={movieData?.runtime}
                                        imdbLink={movieData?.imdb_id}
                                        tmdbLink={movieData?.id}
                                    />
                                </div>
                            </div>
                            <div className='mr-5 p-10'>
                                <ReviewSection movieId={movieData?.id} />
                            </div>
                            {movieData.belongs_to_collection ? (
                                <div className='p-10'>
                                    <RelatedFilms
                                        collectionId={
                                            movieData.belongs_to_collection.id
                                        }
                                    />
                                </div>
                            ) : null}
                            <div className=' p-10'>
                                <SimilarFilms filmId={filmId} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(FilmPage);

FilmPage.getInitialProps = (ctx: { query: { id: any } }) => {
    const { id } = ctx.query;
    if (!id || isNaN(id)) return { initialUser: {}, key: Number(new Date()) };
};

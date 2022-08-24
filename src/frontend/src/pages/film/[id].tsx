import Layout from '@/components/Common/Layout/Layout';
import FilmDetailTabs from '@/components/Screens/FilmPage/components/FilmDetailTabs/FilmDetailTabs';
import FilmStats from '@/components/Screens/FilmPage/components/FilmStats/FilmStats';
import ReviewSection from '@/components/Screens/FilmPage/components/ReviewSection/ReviewSection';
import TertiaryInfo from '@/components/Screens/FilmPage/components/TertiaryInfo/TertiaryInfo';
import { useFilmLazyQuery } from '@/generated/graphql';
import { getFromURL } from '@/utils/url/getFromURL';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillGridFill, BsFillHeartFill } from 'react-icons/bs';

interface FilmPageProps {}

const FilmPage = ({}: FilmPageProps) => {
    const [movieData, setMovieData] = useState<any>({});
    const [showMoreOverview, setShowMoreOverview] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const router = useRouter();

    const [getFilm, { data: extraMovieData }] = useFilmLazyQuery({
        variables: {
            movieId: movieData.id,
        },
    });

    const getMovieDetails = async () => {
        setFetchLoading(true);
        let filmId =
            typeof router.query.id === 'string'
                ? getFromURL(router.query.id)
                : '';
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

    useEffect(() => {
        getMovieDetails();
    }, []);

    useEffect(() => {
        if (movieData.id) {
            getFilm({
                variables: {
                    movieId: movieData.id,
                },
            });
        }
    }, [movieData]);

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
        <Layout showNavBar={true} showSearch={true}>
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    {fetchLoading && movieData.success === false ? (
                        <div>loading...</div>
                    ) : (
                        <>
                            <div className='inline-block p-7'>
                                <div className='float-left'>
                                    <img
                                        className='mr-5 mb-5 inline aspect-auto h-[300px] rounded-md border-[1px] border-crumble-100 p-1 '
                                        src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                                    />
                                    <br />
                                    <FilmStats
                                        extraMovieData={extraMovieData}
                                    />
                                </div>
                                <div className='float-right mt-2 ml-5 w-[400px]'>
                                    <span className='break-word inline text-[24px] font-bold text-white'>
                                        {movieData.original_title}
                                    </span>
                                    <h3 className='ml-3 inline font-semibold text-superRed'>
                                        {movieData.release_date
                                            ? movieData.release_date.split(
                                                  '-'
                                              )[0]
                                            : ''}
                                    </h3>
                                    <div className='mt-2 text-xs'>
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
                        </>
                    )}
                    <div className='p-10'>
                        <ReviewSection movieId={movieData?.id} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(FilmPage);

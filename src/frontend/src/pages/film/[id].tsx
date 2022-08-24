import Layout from '@/components/Common/Layout/Layout';
import FilmDetailTabs from '@/components/Screens/FilmPage/components/FilmDetailTabs/FilmDetailTabs';
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

    const [getFilm, { loading, error, data: extraMovieData }] =
        useFilmLazyQuery({
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
                const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos,images,credits,external_ids,alternative_titles`;
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
        console.log(movieData);
    }, [movieData]);

    return (
        <Layout showNavBar={true} showSearch={true}>
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    {fetchLoading && !movieData ? (
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
                                    <div className='ml-11 inline'>
                                        <p className='inline text-sm'>
                                            {extraMovieData?.film?.watchCount}
                                        </p>
                                        <BsFillEyeFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
                                        <p className='ml-3 inline text-sm'>
                                            {extraMovieData?.film?.listCount}
                                        </p>
                                        <BsFillGridFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
                                        <p className='ml-3 inline text-sm'>
                                            {extraMovieData?.film?.likeCount}
                                        </p>
                                        <BsFillHeartFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
                                    </div>
                                </div>
                                <div className='float-right mt-2 ml-5'>
                                    <h2 className='inline  text-white'>
                                        {movieData.original_title}
                                    </h2>
                                    <h3 className='ml-3 inline font-semibold text-superRed'>
                                        {movieData.release_date
                                            ? movieData.release_date.split(
                                                  '-'
                                              )[0]
                                            : ''}
                                    </h3>
                                    <div className='mt-2 text-sm'>
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
                                        }
                                    />
                                    <TertiaryInfo
                                        runtime={movieData?.runtime}
                                        imdbLink={
                                            movieData?.external_ids?.imdb_id
                                        }
                                        tmdbLink={movieData?.id}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(FilmPage);

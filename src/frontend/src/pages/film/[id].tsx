import Layout from '@/components/Common/Layout/Layout';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface FilmPageProps {}

const FilmPage = ({}: FilmPageProps) => {
    const [movieData, setMovieData] = useState<any>({});
    const router = useRouter();

    const getMovieDetails = async () => {
        let filmId =
            typeof router.query.id === 'string'
                ? router.query.id.split('-')[1]
                : '';
        console.log(filmId);
        if (filmId) {
            const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=062b67bca7a1dbc477fd28d5b6a7eb99&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            setMovieData(data);
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, []);

    useEffect(() => {
        console.log({ movieData });
    }, [movieData]);

    return (
        <Layout showNavBar={true} showSearch={true}>
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    <h2>{movieData.original_title}</h2>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(FilmPage);

import Button from '@/components/Common/Button/Button';
import { useEffect, useState } from 'react';
import { SimilarFilmsType } from './types';

interface SimilarFilmsProps {
    filmId: string;
}

const SimilarFilms = ({ filmId }: SimilarFilmsProps) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [similarFilmsData, setSimilarFilmsData] = useState<
        SimilarFilmsType[]
    >([]);
    useEffect(() => {
        getSimilarFilms();
    }, [filmId]);

    const getSimilarFilms = async () => {
        setFetchLoading(true);
        try {
            if (filmId) {
                const url = `https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
                const response = await fetch(url);
                const data = await response.json();
                setSimilarFilmsData(data.results.slice(0, 5));
            }
        } catch (e) {
            console.log(e);
        } finally {
            setFetchLoading(false);
        }
    };

    if (fetchLoading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <div className='mb-4 border-b-[1px] border-gray-600 p-1'>
                <p className='inline text-xs text-gray-500'>SIMILAR FILMS</p>
                <p className='float-right mt-[6px] inline text-xs text-gray-500'>
                    MORE
                </p>
            </div>
            <div className='text-center'>
                {similarFilmsData.map((films: SimilarFilmsType) => (
                    <div className='mt-2 inline cursor-pointer p-2'>
                        <img
                            className='inline aspect-auto h-[170px] rounded-md border-[1px] border-crumble-100 p-1'
                            src={`https://image.tmdb.org/t/p/original${films.poster_path}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarFilms;

import Button from '@/components/Common/Button/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SimilarFilmsType } from './types';
import NextLink from 'next/link';
import { formatForURL } from '@/utils/url/formatForURL';
import Link from 'next/link';

interface SimilarFilmsProps {
    filmId: string;
}

const SimilarFilms = ({ filmId }: SimilarFilmsProps) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const router = useRouter();
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
        <div className='float-right mt-10 mr-5 w-[700px]'>
            <div className='mb-2 pr-7 pl-7'>
                <p className='inline text-xs text-gray-500'>SIMILAR FILMS</p>
                <p className='float-right mt-[6px] inline text-xs text-gray-500'>
                    MORE
                </p>
            </div>
            <div className='text-center'>
                {similarFilmsData.map((films: SimilarFilmsType) => (
                    <Link
                        href='/film/[id]'
                        as={`/film/${formatForURL(
                            films.original_title.toString()
                        )}-${films.id}`}
                    >
                        <div className='mt-2 inline cursor-pointer p-2'>
                            <img
                                className='inline aspect-auto h-[170px] rounded-md border-[1px] border-crumble-100 p-1'
                                src={`https://image.tmdb.org/t/p/original${films.poster_path}`}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarFilms;

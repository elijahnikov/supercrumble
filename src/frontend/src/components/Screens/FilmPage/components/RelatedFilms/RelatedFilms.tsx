import { useState, useEffect } from 'react';
import { SimilarFilmsType } from '../SimilarFilms/types';
import { RelatedFilmsType } from './types';

interface RelatedFilmsProps {
    collectionId: number;
}

const RelatedFilms = ({ collectionId }: RelatedFilmsProps) => {
    const [fetchLoading, setFetchLoading] = useState(false);
    const [relatedFilmsData, setRelatedFilmsData] = useState<
        RelatedFilmsType[]
    >([]);
    useEffect(() => {
        getRelatedFilms();
    }, [collectionId]);

    const getRelatedFilms = async () => {
        setFetchLoading(true);
        try {
            if (collectionId) {
                const url = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
                const response = await fetch(url);
                const data = await response.json();
                console.log({ data });
                setRelatedFilmsData(data.parts);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setFetchLoading(false);
        }
    };

    return (
        <div>
            <div className='mb-4 border-b-[1px] border-gray-600 p-1'>
                <p className='inline text-xs text-gray-500'>RELATED FILMS</p>
                <p className='float-right mt-[6px] inline text-xs text-gray-500'>
                    MORE
                </p>
            </div>
            <div className='text-center'>
                {relatedFilmsData.map((films: RelatedFilmsType) => (
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

export default RelatedFilms;

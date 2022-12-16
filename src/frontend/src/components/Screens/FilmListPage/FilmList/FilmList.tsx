import { FilmListEntriesType } from './types';
import NextLink from 'next/link';
import { formatForURL } from '@/utils/url/formatForURL';
import { useRouter } from 'next/router';
import { BsX } from 'react-icons/bs';
import { useDeleteFilmListEntryMutation } from '@/generated/graphql';
import { useEffect } from 'react';
import AddFilmToList from '../AddFilmToList/AddFilmToList';

interface FilmListProps {
    filmListEntries?: FilmListEntriesType[];
    editing: boolean;
    handleDelete: (filmEntryId: number) => void;
}

const FilmList = ({
    filmListEntries,
    editing,
    handleDelete,
}: FilmListProps) => {
    const router = useRouter();

    const onPosterClick = (entry: FilmListEntriesType) => {
        if (editing) {
            handleDelete(entry.id);
        } else {
            router.push(
                `/film/${formatForURL(entry.film.movieTitle.toString())}-${
                    entry.film.movieId
                }`
            );
        }
    };

    return (
        <div className='mt-10 grid w-[600px] grid-cols-4 gap-4'>
            {filmListEntries?.map((entry) => (
                <div
                    key={entry.id}
                    className='relative mb-2
                    cursor-pointer
                    rounded-md
                    '
                >
                    {entry.film.posterPath ? (
                        <>
                            <NextLink
                                href='/film/[id]'
                                as={`/film/${formatForURL(
                                    entry.film.movieTitle.toString()
                                )}-${entry.film.movieId}`}
                            >
                                <div
                                    className='absolute h-[226px] w-[140px] 
                                    rounded-md hover:border-[3px]
                                  hover:border-superRed'
                                />
                                <img
                                    onClick={() => onPosterClick(entry)}
                                    className={` block h-[226px] w-[140px] rounded-md hover:bg-sky-700 ${
                                        editing ? 'opacity-40' : ''
                                    }`}
                                    src={
                                        entry.film.posterPath
                                            ? `https://image.tmdb.org/t/p/w500${entry.film.posterPath}`
                                            : undefined
                                    }
                                />
                            </NextLink>
                        </>
                    ) : (
                        <p>?</p>
                    )}
                    {editing && (
                        <BsX
                            className='pointer-events-none 
                            absolute top-[50%]
                            left-[50%] right-0 ml-2 h-[100px]	 
                            w-[100px] -translate-x-1/2 -translate-y-1/2 
                            text-center text-red-400'
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilmList;

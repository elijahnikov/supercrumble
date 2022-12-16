import { useEffect, useState } from 'react';

// Router
import { useRouter } from 'next/router';

// GraphQL
import { useFilmListsQuery } from '@/generated/graphql';

// Types
import { FilmListDataType, FilmListEntryType } from '../PopularFilmLists/types';
import { formatFilmListData } from '@/utils/formatFilmListData';
import { BsFillHeartFill } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';

interface MostRecentFilmListsProps {}

const MostRecentFilmLists = ({}: MostRecentFilmListsProps) => {
    const router = useRouter();
    const { data, loading, error } = useFilmListsQuery({
        variables: {
            limit: 10,
            cursor: null as null | string,
            orderBy: 'createdAt',
            orderDir: 'DESC',
        },
    });

    const [filmListData, setFilmListData] = useState<FilmListDataType[]>([]);

    useEffect(() => {
        setFilmListData(formatFilmListData(data?.filmLists));
    }, [data]);

    return (
        <div>
            <div className='ml-2 h-[3vh]'>
                <div className='w-[100% h-[20px]'>
                    <h4 className='float-left'>Most Recent</h4>
                </div>
                <div className='mt-[10px] ml-[20px]'>
                    {filmListData &&
                        filmListData.map((list: FilmListDataType) => (
                            <div className='mt-8 w-[100%]'>
                                <div className='flex'>
                                    <div
                                        onClick={() =>
                                            router.push(`/list/${list.id}`)
                                        }
                                        className='mt-5 flex w-[350px] cursor-pointer rounded-md border-[1px] border-gray-800 bg-crumble-200'
                                    >
                                        {list.entries.map(
                                            (entry: FilmListEntryType, i) => {
                                                let index =
                                                    list.entries.length * 10;
                                                return (
                                                    <img
                                                        key={i}
                                                        className={`m-2 block h-[144px] w-[90px] rounded-md [&:not(:first-child)]:ml-[-38px] z-${index}`}
                                                        src={
                                                            entry.film
                                                                .posterPath
                                                                ? `https://image.tmdb.org/t/p/w500${entry.film.posterPath}`
                                                                : undefined
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className='mt-8 ml-5 w-[25vw] text-left'>
                                        <h4
                                            onClick={() =>
                                                router.push(`/list/${list.id}`)
                                            }
                                            className='cursor-pointer'
                                        >
                                            {list.title}
                                        </h4>
                                        <div className='mt-1 flex'>
                                            <img
                                                className='mr-[10px] inline h-[20px] w-[20px] rounded-full object-cover'
                                                alt='Profile image'
                                                src={list.creator.avatar}
                                            />
                                            <p className='text-[14px] font-semibold text-slate-400'>
                                                {list.creator.username}
                                            </p>
                                            <p className='ml-2 text-[14px] text-slate-600'>
                                                {list.entries.length} films
                                            </p>
                                            <BsFillHeartFill className='float-left mt-[7px] ml-2 inline h-3 w-3 fill-slate-600' />
                                            <p className='ml-1 text-[12px] text-slate-600'>
                                                {list.score}
                                            </p>
                                            <BiComment className='float-left mt-[7px] ml-2 inline h-3 w-3 fill-slate-600' />
                                            <p className='ml-1 text-[12px] text-slate-600'>
                                                {list.noOfComments}
                                            </p>
                                        </div>
                                        <span className='float-left mt-2'>
                                            {list.description.length > 150
                                                ? list.description.slice(
                                                      0,
                                                      150
                                                  ) + '...'
                                                : list.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MostRecentFilmLists;

import { useEffect, useState } from 'react';

// Types
import { FilmListDataType, FilmListEntryType } from './types';

// GraphQL
import { useFilmListsQuery } from '@/generated/graphql';

// Router
import { useRouter } from 'next/router';

// Icons
import { BsFillHeartFill } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';

interface PopularFilmListsProps {}

const PopularFilmLists = ({}: PopularFilmListsProps) => {
    const router = useRouter();
    const { data, loading, error } = useFilmListsQuery({
        variables: {
            limit: 4,
            cursor: null as null | string,
        },
    });

    const [filmListData, setFilmListData] = useState<FilmListDataType[]>([]);

    const formatFilmListData = (data: any) => {
        let tempData = JSON.parse(JSON.stringify(data));
        tempData.filmLists.map((list: any) => {
            let listId = list.id;
            let entries = tempData.entries.filter(
                (x: any) => x.listId === listId
            );
            list['entries'] = entries;
        });
        delete tempData['entries'];
        setFilmListData(tempData.filmLists);
    };

    useEffect(() => {
        formatFilmListData(data?.filmLists);
    }, [data]);

    return (
        <div className='mt-40'>
            {loading ? (
                <p>loading</p>
            ) : (
                <div>
                    {/* SECTION TITLES */}
                    <div className='ml-6 h-[3vh] w-[68vw]'>
                        <h4 className='float-left'>Popular This Week</h4>
                        <h5 className='float-right mt-1'>MORE</h5>
                    </div>

                    {/* LISTS */}
                    <div className='mt-[2px] flex'>
                        {filmListData &&
                            filmListData.map((list: FilmListDataType) => (
                                <div className='grid grid-cols-4 gap-0'>
                                    {/* <p>{list.title}</p> */}

                                    <div className='w-[17.9vw] p-4'>
                                        <div
                                            onClick={() =>
                                                router.push(`/list/${list.id}`)
                                            }
                                            className='flex w-[252px] cursor-pointer rounded-md border-[1px] border-gray-800 bg-crumble-200'
                                        >
                                            {list.entries.map(
                                                (
                                                    entry: FilmListEntryType,
                                                    i
                                                ) => {
                                                    let index =
                                                        (list.entries.length -
                                                            i -
                                                            1) *
                                                        10;
                                                    return (
                                                        <img
                                                            key={i}
                                                            className={`m-2 block h-[209px] w-[130px] rounded-md [&:not(:first-child)]:ml-[-112px] z-${index}`}
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
                                        <div className='float-left ml-1 mt-2 w-[100%] text-left'>
                                            <h4>{list.title}</h4>
                                            <div className='mt-1 flex'>
                                                <img
                                                    className='mr-[10px] inline h-[20px] w-[20px] rounded-full object-cover'
                                                    alt='Profile image'
                                                    src={list.creator.avatar}
                                                />
                                                <p className='text-[14px] font-semibold text-slate-400'>
                                                    {list.creator.username}
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularFilmLists;

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
import { formatFilmListData } from '@/utils/formatFilmListData';
import Link from 'next/link';

interface PopularFilmListsProps {}

const PopularFilmLists = ({}: PopularFilmListsProps) => {
    const router = useRouter();
    const { data, loading, error } = useFilmListsQuery({
        variables: {
            limit: 3,
            cursor: null as null | string,
        },
    });

    // const [filmListData, setFilmListData] = useState<FilmListDataType[]>([]);

    // useEffect(() => {
    //     setFilmListData(formatFilmListData(data?.filmLists));
    // }, [data]);

    return (
        <div className='mt-40'>
            {loading ? (
                <p>loading</p>
            ) : (
                <div>
                    {/* SECTION TITLES */}
                    <div className='ml-6 h-[3vh] w-[68vw]'>
                        <h4 className='float-left'>Popular This Week</h4>
                        {/* <h5 className='float-right mt-1'>MORE</h5> */}
                    </div>

                    {/* LISTS */}
                    <div className='mt-[2px] flex'>
                        {data?.filmLists &&
                            data.filmLists.filmLists.map(
                                (list: FilmListDataType, j) => (
                                    <div
                                        key={j}
                                        className='grid grid-cols-3 gap-0'
                                    >
                                        {/* <p>{list.title}</p> */}

                                        <div className='w-[17.9vw] p-4'>
                                            <Link
                                                href={`/list/${list.id}`}
                                                className='flex w-[352px] cursor-pointer rounded-md border-[1px] border-gray-800 bg-crumble-200'
                                            >
                                                {list.filmOnePosterPath && (
                                                    <img
                                                        className={`z-50 m-2 block h-[209px] w-[130px] rounded-md`}
                                                        src={`https://image.tmdb.org/t/p/w500${list.filmOnePosterPath}`}
                                                    />
                                                )}
                                                {list.filmTwoPosterPath && (
                                                    <img
                                                        className={`z-40 m-2 ml-[-87px] block h-[209px] w-[130px] rounded-md`}
                                                        src={`https://image.tmdb.org/t/p/w500${list.filmTwoPosterPath}`}
                                                    />
                                                )}
                                                {list.filmThreePosterPath && (
                                                    <img
                                                        className={`z-30 m-2 ml-[-87px] block h-[209px] w-[130px] rounded-md`}
                                                        src={`https://image.tmdb.org/t/p/w500${list.filmThreePosterPath}`}
                                                    />
                                                )}
                                                {list.filmFourPosterPath && (
                                                    <img
                                                        className={`z-20 m-2 ml-[-87px] block h-[209px] w-[130px] rounded-md`}
                                                        src={`https://image.tmdb.org/t/p/w500${list.filmFourPosterPath}`}
                                                    />
                                                )}
                                                {list.filmFivePosterPath && (
                                                    <img
                                                        className={`z-10 m-2 ml-[-87px] block h-[209px] w-[130px] rounded-md`}
                                                        src={`https://image.tmdb.org/t/p/w500${list.filmFivePosterPath}`}
                                                    />
                                                )}
                                            </Link>
                                            <div className='float-left ml-1 mt-2 w-[100%] text-left'>
                                                <h4>{list.title}</h4>
                                                <div className='mt-1 flex'>
                                                    {list.creator.avatar && (
                                                        <Link
                                                            href={`/@${list.creator.username}`}
                                                        >
                                                            <img
                                                                className='mr-[10px] inline h-[20px] w-[20px] rounded-full object-cover'
                                                                alt='Profile image'
                                                                src={
                                                                    list.creator
                                                                        .avatar
                                                                }
                                                            />
                                                        </Link>
                                                    )}
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
                                )
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularFilmLists;

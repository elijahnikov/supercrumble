import CreateListModal from '@/components/Common/CreateListModal/CreateListModal';
import { useFilmListsQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { FilmListType } from './types';

interface ListsTabProps {
    username: string;
}

interface FilmListProps {
    filmList: FilmListType;
}

const ListsTab = ({ username }: ListsTabProps) => {
    // const username = getUsername();

    const [listOpen, setListOpen] = useState<boolean>(false);

    const { data, loading, error, fetchMore, variables } = useFilmListsQuery({
        variables: {
            limit: 10,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    if (!data) {
        return <h1 className='text-white'>no data found</h1>;
    }

    return (
        <div>
            {loading && <p>loading...</p>}
            {!loading && data.filmLists.filmLists.length > 0 ? (
                <div>
                    <br />
                    <div className='w-full'>
                        {data &&
                            data.filmLists.filmLists.map((filmList, index) => (
                                <FilmList filmList={filmList} key={index} />
                            ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className='mt-[20px] h-[150px] rounded-md border border-slate-800 text-center'>
                        <div className='mt-[30px] w-full justify-center text-center'>
                            <div className='inline w-full text-slate-400'>
                                <h4 className='mb-[-20px] text-white'>
                                    You haven't added any lists.
                                </h4>
                                <CreateListModal
                                    fromMenu={false}
                                    open={listOpen}
                                    setOpen={setListOpen}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const FilmList = ({ filmList }: FilmListProps) => {
    const router = useRouter();

    return (
        <div className='flex'>
            <div
                onClick={() => router.push(`/list/${filmList.id}`)}
                className='mt-5 flex w-[350px] cursor-pointer rounded-md border-[1px] border-gray-800 bg-crumble-200'
            >
                {filmList.filmOnePosterPath && (
                    <img
                        className={`z-50 m-2 block h-[144px] w-[90px] rounded-md`}
                        src={`https://image.tmdb.org/t/p/w500${filmList.filmOnePosterPath}`}
                    />
                )}
                {filmList.filmTwoPosterPath && (
                    <img
                        className={`z-40 m-2 block h-[144px] w-[90px] rounded-md [&:not(:first-child)]:ml-[-38px]`}
                        src={`https://image.tmdb.org/t/p/w500${filmList.filmTwoPosterPath}`}
                    />
                )}
                {filmList.filmThreePosterPath && (
                    <img
                        className={`z-30 m-2 block h-[144px] w-[90px] rounded-md [&:not(:first-child)]:ml-[-38px]`}
                        src={`https://image.tmdb.org/t/p/w500${filmList.filmThreePosterPath}`}
                    />
                )}
                {filmList.filmFourPosterPath && (
                    <img
                        className={`z-20 m-2 block h-[144px] w-[90px] rounded-md [&:not(:first-child)]:ml-[-38px]`}
                        src={`https://image.tmdb.org/t/p/w500${filmList.filmFourPosterPath}`}
                    />
                )}
                {filmList.filmFivePosterPath && (
                    <img
                        className={`z-10 m-2 block h-[144px] w-[90px] rounded-md [&:not(:first-child)]:ml-[-38px]`}
                        src={`https://image.tmdb.org/t/p/w500${filmList.filmFivePosterPath}`}
                    />
                )}
            </div>
            <div className='mt-8 ml-5 w-[25vw] text-left'>
                <h4
                    onClick={() => router.push(`/list/${filmList.id}`)}
                    className='cursor-pointer'
                >
                    {filmList.title}
                </h4>
                <div className='mt-1 flex'>
                    {filmList.creator.avatar && (
                        <img
                            className='mr-[10px] inline h-[20px] w-[20px] rounded-full object-cover'
                            alt='Profile image'
                            src={filmList.creator.avatar}
                        />
                    )}
                    <p className='text-[14px] font-semibold text-slate-400'>
                        {filmList.creator.username}
                    </p>
                    <p className='ml-4 text-[12px] text-slate-600'>
                        {filmList.numberOfFilms} films added
                    </p>
                    <BsFillHeartFill className='float-left mt-[7px] ml-2 inline h-3 w-3 fill-slate-600' />
                    <p className='ml-1 text-[12px] text-slate-600'>
                        {filmList.score}
                    </p>
                    <BiComment className='float-left mt-[7px] ml-2 inline h-3 w-3 fill-slate-600' />
                    <p className='ml-1 text-[12px] text-slate-600'>
                        {filmList.noOfComments}
                    </p>
                </div>
                <div className='mt-2 w-full'>
                    {filmList.description &&
                    filmList.description.length > 150 ? (
                        <div>
                            <span>{filmList.description.slice(0, 140)}...</span>
                            <a
                                onClick={() =>
                                    router.push(`/list/${filmList.id}`)
                                }
                                className='ml-2 cursor-pointer text-sm text-superRed'
                            >
                                Read more
                            </a>
                        </div>
                    ) : (
                        <span>{filmList.description}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListsTab;

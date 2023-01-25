import { useEffect, useRef, useState } from 'react';

// Components
import InputArea from '@/components/Common/InputArea/InputArea';
import InputField from '@/components/Common/InputField/InputField';
import Layout from '@/components/Common/Layout/Layout';
import Tags from '@/components/Common/Tags/Tags';
import EditingIcons from '@/components/Screens/FilmListPage/EditingIcons/EditingIcons';
import FilmList from '@/components/Screens/FilmListPage/FilmList/FilmList';
import FilmListCommentSection from '@/components/Screens/FilmListPage/FIlmListCommentSection/FilmListCommentSection';
import FilmListUpvoteButton from '@/components/Screens/FilmListPage/FilmListUpvoteButton/FilmListUpvoteButton';

// GraphQL
import {
    FilmListDocument,
    useDeleteFilmListEntryMutation,
    useMeQuery,
    useUpdateFilmListMutation,
} from '@/generated/graphql';

// Utils
import { epochToDate } from '@/utils/EpochToDate';
import { getListFromURL } from '@/utils/getFromURL/list/getListFromURL';
import { withApollo } from '@/utils/withApollo';
import { kFormatter } from '@/utils/general';

// React Icons
import { BiComment } from 'react-icons/bi';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import AddFilmToList from '@/components/Screens/FilmListPage/AddFilmToList/AddFilmToList';

interface ListPageProps {}

const ListPage = ({}: ListPageProps) => {
    const { data, loading, error } = getListFromURL();
    const { data: me, loading: loadingMe } = useMeQuery();
    const [deleteFilmListEntry] = useDeleteFilmListEntryMutation({
        refetchQueries: [
            {
                query: FilmListDocument,
            },
            'FilmList',
        ],
    });
    const [updateFilmList] = useUpdateFilmListMutation({
        refetchQueries: [
            {
                query: FilmListDocument,
            },
            'FilmList',
        ],
    });

    const myRef = useRef<any>(null);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        setTitle(data?.filmList?.filmList?.title!!);
        setDescription(data?.filmList?.filmList?.description!!);
    }, [data]);

    const ScrollDemo = () => {
        const executeScroll = () =>
            myRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });

        return (
            <>
                <div
                    onClick={executeScroll}
                    className='float-left mt-[-25px] inline-block cursor-pointer'
                >
                    <BiComment className='mr-3 ml-[90px] inline' />
                    <p className='mr-1 inline text-[12px] text-white'>
                        {data?.filmList?.filmList?.noOfComments &&
                            kFormatter(data?.filmList?.filmList?.noOfComments)}
                    </p>
                    <BsFillArrowDownCircleFill className='float-right ml-[10px] mt-[5px] inline' />
                </div>
            </>
        );
    };

    const handleDelete = async (filmEntryId: number) => {
        deleteFilmListEntry({
            variables: {
                id: filmEntryId,
                filmListId: data?.filmList?.filmList?.id!!,
            },
        });
    };

    const handleUpdate = async () => {
        setUpdateLoading(true);
        updateFilmList({
            variables: {
                id: data?.filmList?.filmList?.id!!,
                description,
                title,
            },
        });
        setEditing(!editing);
        setUpdateLoading(false);
    };

    if (!data?.filmList) {
        return <h1>Post does not exist</h1>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={
                data.filmList.filmListEntries[0].film.backdropPath!!
            }
        >
            <div className='mb-20 ml-[55px] flex justify-center'>
                <div className='smallerPageFrame'>
                    <div className='float-left mt-[280px] mb-10 justify-center p-5'>
                        <div className='flex'>
                            <img
                                className='mr-[10px] inline h-[25px] w-[25px] rounded-full object-cover'
                                src={data.filmList.filmList?.creator.avatar!!}
                                alt='Profile image'
                            />
                            <p className='ml-2 inline'>List by</p>
                            <p className='ml-1 inline font-bold'>
                                {data.filmList.filmList?.creator.username}
                            </p>
                        </div>
                        <div className='mt-5'>
                            <div className='flex'>
                                {editing ? (
                                    <div className='w-[500px]'>
                                        <InputField
                                            type='text'
                                            name='title'
                                            value={title}
                                            placeholder={
                                                data.filmList.filmList?.title!!
                                            }
                                            onChange={(e: any) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                ) : (
                                    <h1>{data.filmList.filmList?.title}</h1>
                                )}
                                {}
                                {me?.me?.id ===
                                data.filmList.filmList?.creator.id ? (
                                    <EditingIcons
                                        editing={editing}
                                        setEditing={setEditing}
                                        handleUpdate={handleUpdate}
                                    />
                                ) : null}
                            </div>
                            <p className='inline text-xs text-slate-400'>
                                Created on{' '}
                                {epochToDate(
                                    data.filmList.filmList?.createdAt!!
                                )}{' '}
                                -
                            </p>
                            <p className='inline text-xs text-slate-400'>
                                {' '}
                                {data.filmList.filmListEntries.length} films
                                saved
                            </p>
                        </div>
                        <div className='mt-5 mb-5'>
                            {editing ? (
                                <InputArea
                                    value={description}
                                    name='description'
                                    placeholder={
                                        data.filmList.filmList?.description!!
                                    }
                                    onChange={(e: any) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            ) : (
                                <span>
                                    {data.filmList.filmList?.description}
                                </span>
                            )}
                        </div>
                        <div className=' float-left'>
                            {data.filmList.filmList?.tags && (
                                <Tags tags={data.filmList.filmList.tags} />
                            )}
                        </div>
                        <br />
                        <div className=' mt-[30px] ml-[-40px] inline-block'>
                            <FilmListUpvoteButton
                                filmList={data.filmList}
                                variant={'small'}
                            />
                            {ScrollDemo()}
                        </div>
                        {/* {editing && (
                            <AddFilmToList
                                listId={data.filmList.filmList?.id!!}
                            />
                        )} */}

                        <br />
                        <FilmList
                            handleDelete={handleDelete}
                            editing={editing}
                            filmListEntries={data.filmList.filmListEntries}
                        />
                        <FilmListCommentSection
                            scrollToRef={myRef}
                            user={me!!}
                            filmList={data.filmList}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListPage);

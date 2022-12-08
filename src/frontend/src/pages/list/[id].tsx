import Layout from '@/components/Common/Layout/Layout';
import Tags from '@/components/Common/Tags/Tags';
import { useMeQuery } from '@/generated/graphql';
import { epochToDate } from '@/utils/EpochToDate';
import { getListFromURL } from '@/utils/getFromURL/list/getListFromURL';
import { getListIntId } from '@/utils/getFromURL/list/getListIntId';
import { kFormatter } from '@/utils/kFormatter';
import { withApollo } from '@/utils/withApollo';
import { useEffect, useRef } from 'react';
import { BiComment } from 'react-icons/bi';

interface ListPageProps {}

const ListPage = ({}: ListPageProps) => {
    const { data, loading, error } = getListFromURL();
    const { data: me, loading: loadingMe } = useMeQuery();
    const myRef = useRef<any>(null);

    if (!data?.filmList) {
        return <h1>Post does not exist</h1>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    const ScrollDemo = () => {
        const executeScroll = () =>
            myRef.current.scollIntoView({
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
                        {kFormatter(1000)}
                    </p>
                </div>
            </>
        );
    };

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={data.filmList.filmListEntries[0].film.backdropPath}
        >
            <div className='mb-20 flex justify-center'>
                <div className='smallerPageFrame'>
                    <div className='float-left mt-[320px] mb-10 justify-center p-5'>
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
                            <h1>{data.filmList.filmList?.title}</h1>
                            <p className='inline text-xs text-slate-400'>
                                Created on{' '}
                                {epochToDate(
                                    data.filmList.filmList?.createdAt!!
                                )}
                            </p>
                        </div>
                        <div className='mt-5'>
                            <p>{data.filmList.filmList?.description}</p>
                        </div>

                        {/* <ScrollDemo /> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListPage);

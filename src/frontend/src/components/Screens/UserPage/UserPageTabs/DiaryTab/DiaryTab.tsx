import { useEffect, useState } from 'react';

// Components
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';
import SuperTable from '@/components/Common/SuperTable/SuperTable';

// Utils
import { formatForURL } from '@/utils/url/formatForURL';
import { getMonthName } from '@/utils/general';
import { DiaryQuery, useDiaryQuery } from '@/generated/graphql';

// React Icons
import { BiCommentDetail, BiRefresh } from 'react-icons/bi';

// Router
import NextLink from 'next/link';

// React Rating
import { Rating } from 'react-simple-star-rating';

interface DiaryTabProps {
    userId: number;
}

const DiaryTab = ({ userId }: DiaryTabProps) => {
    const { data, loading } = useDiaryQuery({
        variables: {
            userId: userId,
            limit: 10,
        },
    });

    const columns = [
        {
            id: 1,
            title: 'MONTH',
            sortable: false,
            value: 'watchedOn',
            cell: (data: any) => (
                <div className='justify-center text-center'>
                    <p className='text-md text-slate-400'>
                        {getMonthName(
                            Number(data.watchedOn.split('/')[1])
                        ).toLocaleUpperCase()}
                    </p>
                    <p className='text-xs text-slate-300'>
                        {data.watchedOn.split('/')[2]}
                    </p>
                </div>
            ),
            show: true,
            fullDataRow: true,
            width: '10%',
        },
        {
            id: 2,
            title: 'DAY',
            sortable: false,
            value: 'watchedOn',
            cell: (data: any) => (
                <p className='text-center text-2xl text-slate-400'>
                    {data.watchedOn.split('/')[0]}
                </p>
            ),
            show: true,
            fullDataRow: true,
            width: '10%',
        },
        {
            id: 3,
            title: 'FILM',
            sortable: false,
            value: 'filmTitle',
            cell: (data: any) => (
                <div className='flex text-center'>
                    {data.posterPath ? (
                        <NextLink
                            href='/film/[id]'
                            as={`/film/${formatForURL(
                                data.filmTitle.toString()
                            )}-${data.filmId}`}
                        >
                            <img
                                className={`aspect-auto h-16 rounded-md border-[1px] border-slate-700 hover:outline hover:outline-superRed `}
                                src={
                                    data.posterPath
                                        ? `https://image.tmdb.org/t/p/w500${data.posterPath}`
                                        : undefined
                                }
                            />
                        </NextLink>
                    ) : (
                        <p>?</p>
                    )}
                    <h4 className='mt-[20px] ml-5 text-white'>
                        {data.filmTitle}
                    </h4>
                </div>
            ),
            show: true,
            fullDataRow: true,
            width: '50%',
        },
        {
            id: 4,
            title: 'RATING',
            sortable: false,
            value: 'ratingGiven',
            cell: (data: any) => (
                <div>
                    <Rating
                        readonly
                        allowFraction={true}
                        size={15}
                        fillColor={'#FD4443'}
                        initialValue={Number(data.ratingGiven)}
                    />
                </div>
            ),
            show: true,
            fullDataRow: true,
            width: '10%',
        },
        {
            id: 6,
            title: 'REWATCH',
            sortable: false,
            value: 'rewatch',
            cell: (data: any) => (
                <>
                    {Boolean(data.rewatch) ? (
                        <BiRefresh className='h-[20px] w-[20px] fill-slate-400' />
                    ) : null}
                </>
            ),
            show: true,
            fullDataRow: true,
            width: '5%',
        },
        {
            id: 7,
            title: 'REVIEW',
            sortable: false,
            value: 'reviewLink',
            cell: (data: any) => (
                <>
                    {data.reviewLink ? (
                        <NextLink href='/review/[id]' as={`${data.reviewLink}`}>
                            <BiCommentDetail className='h-[15px] w-[15px] fill-slate-400' />
                        </NextLink>
                    ) : null}
                </>
            ),
            show: true,
            fullDataRow: true,
            width: '5%',
        },
    ];

    if (loading) {
        return <h1>loading...</h1>;
    }

    return (
        <>
            <div>
                <SecondaryUserPageTabs />
                <br />
                <div className='mt-[100px] mb-[100px]'>
                    {data && data.diary.diary.length > 0 ? (
                        <div>
                            <SuperTable
                                columns={columns}
                                data={data.diary.diary}
                            />
                        </div>
                    ) : (
                        <>
                            <div className='mt-[20px] h-[120px] rounded-md border border-slate-800 text-center'>
                                <div className='mt-[30px] w-full justify-center text-center'>
                                    <div className='inline w-full text-slate-400'>
                                        <h4 className='text-white'>
                                            Looks like you haven't logged any
                                            films on SuperCrumble
                                        </h4>
                                        <p className='inline'>
                                            Review films or simply add to your
                                            log with a watched date and they'll
                                            show up here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <br />
        </>
    );
};

export default DiaryTab;

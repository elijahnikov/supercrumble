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

    const [formattedData, setFormattedData] = useState<any[]>([]);

    useEffect(() => {
        if (data && !loading) formatData(data);
    }, [data]);

    const formatData = (data?: DiaryQuery) => {
        console.log(data);
        let tempData = data?.diary.diary.map((diary: any) => ({
            month: diary.watchedOn,
            day: diary.watchedOn,
            film: diary.filmTitle,
            filmId: diary.filmId,
            rating: diary.ratingGiven,
            rewatch: diary.rewatch,
            review: diary.reviewLink,
            poster: diary.posterPath,
        }));
        setFormattedData(tempData!!);
    };

    const columns = [
        {
            id: 1,
            title: 'MONTH',
            sortable: false,
            value: 'month',
            cell: (data: any) => (
                <div className='justify-center text-center'>
                    <p className='text-md text-slate-400'>
                        {getMonthName(
                            Number(data.month.split('/')[1])
                        ).toLocaleUpperCase()}
                    </p>
                    <p className='text-xs text-slate-300'>
                        {data.month.split('/')[2]}
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
            value: 'day',
            cell: (data: any) => (
                <p className='text-center text-2xl text-slate-400'>
                    {data.day.split('/')[0]}
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
            value: 'film',
            cell: (data: any) => (
                <div className='flex text-center'>
                    {data.poster ? (
                        <NextLink
                            href='/film/[id]'
                            as={`/film/${formatForURL(data.film.toString())}-${
                                data.filmId
                            }`}
                        >
                            <img
                                className={`aspect-auto h-16 rounded-md border-[1px] border-slate-700 hover:outline hover:outline-superRed `}
                                src={
                                    data.poster
                                        ? `https://image.tmdb.org/t/p/w500${data.poster}`
                                        : undefined
                                }
                            />
                        </NextLink>
                    ) : (
                        <p>?</p>
                    )}
                    <h4 className='mt-[20px] ml-5'>{data.film}</h4>
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
            value: 'rating',
            cell: (data: any) => (
                <div>
                    <Rating
                        readonly
                        allowFraction={true}
                        size={15}
                        fillColor={'#FD4443'}
                        initialValue={Number(data.rating)}
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
            value: 'review',
            cell: (data: any) => (
                <>
                    {data.review ? (
                        <NextLink href='/review/[id]' as={`${data.review}`}>
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
        <div>
            <SecondaryUserPageTabs />
            <div className='mt-20'>
                <SuperTable columns={columns} data={formattedData} />
            </div>
        </div>
    );
};

export default DiaryTab;

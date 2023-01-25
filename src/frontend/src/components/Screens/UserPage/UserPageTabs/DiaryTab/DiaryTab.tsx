import SuperTable from '@/components/Common/SuperTable/SuperTable';
import { DiaryQuery, MeQuery, useDiaryQuery } from '@/generated/graphql';
import { TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';

interface DiaryTabProps {
    userId: number;
}

const DiaryTab = ({ userId }: DiaryTabProps) => {
    const { data } = useDiaryQuery({
        variables: {
            userId: userId,
            limit: 10,
        },
    });

    const [formattedData, setFormattedData] = useState<any[]>([]);

    useEffect(() => {
        formatData(data);
    }, [data]);

    const formatData = (data?: DiaryQuery) => {
        let tempData = data?.diary.diary.map((diary: any) => ({
            month: diary.watchedOn,
            day: diary.watchedOn,
            film: diary.filmTitle,
            rating: diary.ratingGiven,
            rewatch: diary.rewatch,
            review: diary.reviewLink,
        }));
        setFormattedData(tempData!!);
    };

    const columns = [
        {
            id: 1,
            title: 'MONTH',
            sortable: false,
            value: 'month',
            cell: (data: any) => <p className='text-slate-500'>{data.month}</p>,
            show: true,
            fullDataRow: true,
            width: '10%',
        },
        {
            id: 2,
            title: 'DAY',
            sortable: false,
            value: 'day',
            cell: (data: any) => <p>{data.day}</p>,
            show: true,
            fullDataRow: true,
            width: '10%',
        },
        {
            id: 3,
            title: 'FILM',
            sortable: false,
            value: 'film',
            cell: (data: any) => <h4>{data.film}</h4>,
            show: true,
            fullDataRow: true,
            width: '40%',
        },
        {
            id: 4,
            title: 'RATING',
            sortable: false,
            value: 'rating',
            cell: (data: any) => <p>{data.rating}</p>,
            show: true,
            fullDataRow: true,
        },
        {
            id: 6,
            title: 'REWATCH',
            sortable: false,
            value: 'rewatch',
            cell: (data: any) => <p>{String(data.rewatch)}</p>,
            show: true,
            fullDataRow: true,
        },
        {
            id: 7,
            title: 'REVIEW',
            sortable: false,
            value: 'review',
            cell: (data: any) => <p>{data.review}</p>,
            show: true,
            fullDataRow: true,
        },
    ];

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

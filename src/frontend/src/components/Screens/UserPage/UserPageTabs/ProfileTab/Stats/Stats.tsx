// GraphQL
import {
    GetUserByUsernameQuery,
    useNumberOfWatchedByYearQuery,
} from '@/generated/graphql';

type UserDetails = GetUserByUsernameQuery['getUserByUsername'];

interface StatsProps {
    stats: Pick<
        NonNullable<UserDetails>,
        | 'followers'
        | 'following'
        | 'totalFilmsWatched'
        | 'totalHoursWatched'
        | 'totalListsCreated'
    >;
}

const Stats = ({ stats }: StatsProps) => {
    const { data: watched } = useNumberOfWatchedByYearQuery({
        variables: {
            year: new Date().getFullYear().toString(),
        },
    });

    return (
        <div className='mt-5 flex rounded-md border border-slate-800 p-5'>
            <div className='flex w-[100%]'>
                <div className='w-[25%]'>
                    <h1 className='text-[28px]'>{stats.totalFilmsWatched}</h1>
                    <p className='text-[12px] text-superRed'>FILMS</p>
                </div>
                <div className='w-[25%]'>
                    <h1 className='text-[28px]'>
                        {watched?.numberOfWatchedByYear
                            ? watched.numberOfWatchedByYear
                            : 0}
                    </h1>
                    <p className='text-[12px] text-superRed'>THIS YEAR</p>
                </div>
                <div className='w-[25%]'>
                    <h1 className='text-[28px]'>{stats.totalHoursWatched}</h1>
                    <p className='text-[12px] text-superRed'>HOURS</p>
                </div>
                <div className='w-[25%]'>
                    <h1 className='text-[28px]'>{stats.totalListsCreated}</h1>
                    <p className='text-[12px] text-superRed'>LISTS</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;

interface UserStatsProps {
    filmsWatched: number;
    totalHoursWatched: number;
    listsCreated: number;
    following: number;
    followers: number;
}

const UserStats = ({
    filmsWatched,
    totalHoursWatched,
    listsCreated,
    followers,
    following,
}: UserStatsProps) => {
    return (
        <div className='float-right m-2 flex justify-center text-center'>
            <div className='mx-5'>
                <p>{filmsWatched}</p>
                <p className='text-xs uppercase text-slate-500'>Films</p>
            </div>
            <div className='mt-2 h-[30px] border-[0.5px] border-slate-800' />

            <div className='mx-5'>
                <p>{totalHoursWatched}</p>
                <p className='text-xs uppercase text-slate-500'>Hours</p>
            </div>
            <div className='mt-2 h-[30px] border-[0.5px] border-slate-800' />
            <div className='mx-5'>
                <p>{listsCreated}</p>
                <p className='text-xs uppercase text-slate-500'>Lists</p>
            </div>
            <div className='mt-2 h-[30px] border-[0.5px] border-slate-800' />
            <div className='mx-5'>
                <p>{followers}</p>
                <p className='text-xs uppercase text-slate-500'>Followers</p>
            </div>
            <div className='mt-2 h-[30px] border-[0.5px] border-slate-800' />
            <div className='mx-5'>
                <p>{following}</p>
                <p className='text-xs uppercase text-slate-500'>Following</p>
            </div>
        </div>
    );
};

export default UserStats;

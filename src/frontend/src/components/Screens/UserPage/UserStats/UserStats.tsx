interface UserStatsProps {
    filmsWatched: number;
    following: number;
    followers: number;
}

const UserStats = ({ filmsWatched, followers, following }: UserStatsProps) => {
    return (
        <div className='float-left m-2 ml-[140px] flex justify-center text-center'>
            <div className='mx-5 inline-block'>
                <p className='inline'>{followers} </p>
                <p className='inline text-sm text-slate-500'>Followers</p>
            </div>

            <div className='mx-5 inline-block'>
                <p className='inline'>{following} </p>
                <p className='inline text-sm text-slate-500'>Following</p>
            </div>

            <div className='mx-5 inline-block'>
                <p className='inline'>{filmsWatched} </p>
                <p className='inline text-sm text-slate-500'> Films</p>
            </div>
        </div>
    );
};

export default UserStats;

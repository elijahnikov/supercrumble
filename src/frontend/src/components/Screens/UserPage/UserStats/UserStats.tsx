interface UserStatsProps {
    following: number;
    followers: number;
}

const UserStats = ({ followers, following }: UserStatsProps) => {
    return (
        <div className='float-left m-2 ml-[172px]'>
            <div className='mx-5 inline-block'>
                <p className='inline'>{followers} </p>
                <p className='ml-1 inline text-sm text-slate-500'>Followers</p>
            </div>

            <div className='mx-5 inline-block'>
                <p className='inline'>{following} </p>
                <p className='ml-1 inline text-sm text-slate-500'>Following</p>
            </div>
        </div>
    );
};

export default UserStats;

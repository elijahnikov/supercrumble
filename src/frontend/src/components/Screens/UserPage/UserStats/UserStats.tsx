import { useState } from 'react';
import FollowersModal from '../UserPageTabs/ProfileTab/FollowersModal/FollowersModal';

interface UserStatsProps {
    following: number;
    followers: number;
    userId: number;
}

const UserStats = ({ followers, following, userId }: UserStatsProps) => {
    const [followersModalOpen, setFollowersModalOpen] =
        useState<boolean>(false);
    const [followingModalOpen, setFollowingModalOpen] =
        useState<boolean>(false);

    return (
        <>
            <div className='float-left m-2 ml-[172px]'>
                <div
                    className='mx-5 inline-block cursor-pointer'
                    onClick={() => setFollowersModalOpen(!followersModalOpen)}
                >
                    <p className='inline'>{followers} </p>
                    <p className='ml-1 inline text-sm text-slate-500 hover:underline'>
                        Followers
                    </p>
                </div>

                <div
                    className='mx-5 inline-block'
                    onClick={() => setFollowingModalOpen(!followingModalOpen)}
                >
                    <p className='inline'>{following} </p>
                    <p className='ml-1 inline text-sm text-slate-500'>
                        Following
                    </p>
                </div>
            </div>
            <FollowersModal
                userId={userId}
                open={followersModalOpen}
                setOpen={setFollowersModalOpen}
            />
        </>
    );
};

export default UserStats;

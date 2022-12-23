import Button from '@/components/Common/Button/Button';
import {
    CheckIfFollowingUserQuery,
    GetUserByUsernameQuery,
} from '@/generated/graphql';
import UserStats from '../UserStats/UserStats';
import FollowButton from './FollowButton/FollowButton';

interface UserProfileProps {
    data?: GetUserByUsernameQuery;
    isCurrentUser?: boolean;
}

const UserProfile = ({ data, isCurrentUser }: UserProfileProps) => {
    return (
        <>
            {data && (
                <div className='mx-auto mb-10 w-[75%] justify-center text-center'>
                    <div className=''>
                        <div className='float-left mb-[10px] flex '>
                            <div>
                                {data?.getUserByUsername?.avatar && (
                                    <img
                                        className=' inline h-[140px] w-[140px] rounded-full object-cover'
                                        src={data.getUserByUsername.avatar}
                                    />
                                )}
                            </div>
                            <div className='ml-5 text-left'>
                                <h3 className='mt-5'>
                                    {data?.getUserByUsername?.displayName}
                                </h3>
                                <p className='text-slate-500'>
                                    @{data?.getUserByUsername?.username}
                                </p>
                                {/* {!isCurrentUser ? (
                                    <FollowButton
                                        user={data.getUserByUsername!!}
                                    />
                                ) : null} */}
                            </div>
                        </div>
                        {/* <UserStats
                            filmsWatched={
                                data?.getUserByUsername?.totalFilmsWatched
                                    ? data.getUserByUsername.totalFilmsWatched
                                    : 0
                            }
                            totalHoursWatched={
                                data?.getUserByUsername?.totalHoursWatched
                                    ? data.getUserByUsername.totalHoursWatched
                                    : 0
                            }
                            listsCreated={
                                data?.getUserByUsername?.totalListsCreated
                                    ? data.getUserByUsername.totalListsCreated
                                    : 0
                            }
                            followers={
                                data?.getUserByUsername?.followers
                                    ? data.getUserByUsername.followers
                                    : 0
                            }
                            following={
                                data?.getUserByUsername?.following
                                    ? data.getUserByUsername.following
                                    : 0
                            }
                        /> */}
                        <div className='clear-both ml-[9.5vw] text-left'>
                            <p className='w-[20vw] text-sm text-slate-400'>
                                {data.getUserByUsername?.bio}
                            </p>
                            <p className='w-[20vw] text-xs text-superRed'>
                                {data.getUserByUsername?.bioLink}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;

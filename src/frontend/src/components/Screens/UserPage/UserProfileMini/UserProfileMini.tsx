import Button from '@/components/Common/Button/Button';
import { GetUserByUsernameQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { BsFillPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import FollowButton from '../UserProfile/FollowButton/FollowButton';
import UserStats from '../UserStats/UserStats';

interface UserProfileMiniProps {
    data?: GetUserByUsernameQuery;
    isCurrentUser?: boolean;
}

const UserProfileMini = ({ data, isCurrentUser }: UserProfileMiniProps) => {
    const router = useRouter();
    return (
        <div className='mb-[-10px]  h-[150px] rounded-xl border-[0.5px] border-slate-700'>
            {data?.getUserByUsername?.header ? (
                <img
                    src={data.getUserByUsername.header}
                    className='aspect-auto h-[150px] w-[100%] rounded-xl object-cover'
                />
            ) : (
                <div className='relative h-[150px] w-[100%] rounded-xl bg-green-400 bg-gradient-to-tr from-white via-lime-100 to-indigo-200' />
            )}
            <div className='flex w-[80%]'>
                <img
                    className='relative top-[-135px]
                                    ml-8 
                                    h-[120px] w-[120px] 
                                    cursor-pointer rounded-full 
                                    object-cover'
                    src={
                        data?.getUserByUsername?.avatar
                            ? data.getUserByUsername.avatar
                            : ''
                    }
                    alt='Profile image'
                />

                {/* <div className='m-3 '>
                    <h3 className='float-left inline'>
                        {data?.getUserByUsername?.displayName}
                    </h3>
                    {data?.getUserByUsername?.verified && (
                        <BsFillPatchCheckFill className='float-left mt-[10px] ml-2 inline' />
                    )}
                    <p className='float-left clear-both text-sm text-slate-500'>
                        @{data?.getUserByUsername?.username}
                    </p>
                    <br />
                    <br />
                    <p className='clear-both mt-5'>
                        {data?.getUserByUsername?.bio}
                    </p>
                    <a
                        target={'_blank'}
                        href={`http://www.${data?.getUserByUsername?.bioLink}`}
                        className='float-left clear-both mt-2 text-sm text-superRed hover:underline'
                    >
                        {data?.getUserByUsername?.bioLink}
                    </a>
                </div> */}
            </div>
            {isCurrentUser ? (
                <div className='relative top-[-260px] float-right w-[19%]'>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            router.push(
                                `/@${data?.getUserByUsername?.username}/settings`
                            );
                        }}
                        className='ml-5 text-sm'
                    >
                        <BsPencilFill className='mr-2' />
                        Edit profile
                    </Button>
                </div>
            ) : (
                <div className='relative top-[-260px] float-right w-[19%]'>
                    <FollowButton user={data!.getUserByUsername!!} />
                </div>
            )}
            {/* <UserStats
                followers={data?.getUserByUsername?.followers!}
                following={data?.getUserByUsername?.following!}
            /> */}
        </div>
    );
};

export default UserProfileMini;

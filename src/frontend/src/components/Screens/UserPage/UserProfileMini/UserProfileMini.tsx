import Button from '@/components/Common/Button/Button';
import { GetUserByUsernameQuery } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { BsFillPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import UserPageTabs from '../UserPageTabs/UserPageTabs';
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
            </div>
            {isCurrentUser ? (
                <div className='relative top-[-260px] left-[690px] w-[19%]'>
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
        </div>
    );
};

export default UserProfileMini;

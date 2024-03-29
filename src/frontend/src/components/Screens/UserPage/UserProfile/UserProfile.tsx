import Button from '@/components/Common/Button/Button';
import {
    CheckIfFollowingUserQuery,
    GetUserByUsernameQuery,
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillPatchCheckFill, BsPencil, BsPencilFill } from 'react-icons/bs';
import UserStats from '../UserStats/UserStats';
import FollowButton from './FollowButton/FollowButton';

interface UserProfileProps {
    data?: GetUserByUsernameQuery;
    isCurrentUser?: boolean;
}

const UserProfile = ({ data, isCurrentUser }: UserProfileProps) => {
    const router = useRouter();

    return (
        <div className='mb-[-10px]  h-[350px] rounded-xl border-[0.5px] border-slate-700'>
            {data?.getUserByUsername?.header ? (
                <img
                    src={data.getUserByUsername.header}
                    className='aspect-auto h-[150px] w-[100%] rounded-tl-xl rounded-tr-xl object-cover'
                />
            ) : (
                <div
                    className='
                    relative h-[150px] w-[100%] 
                    rounded-tl-xl rounded-tr-xl 
                    bg-green-400 bg-gradient-to-tr from-white via-lime-100 to-indigo-200'
                />
            )}
            <div className='flex w-[80%]'>
                <img
                    className='relative top-[-80px]
                                ml-8 h-[150px] w-[150px] 
                                cursor-pointer rounded-full 
                                object-cover'
                    src={
                        data?.getUserByUsername?.avatar
                            ? data.getUserByUsername.avatar
                            : ''
                    }
                    alt='Profile image'
                />

                <div className='m-3 '>
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
                </div>
            </div>
            {isCurrentUser ? (
                <div className='relative top-[-140px] float-right w-[19%]'>
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
                <div className='relative top-[-140px] float-right w-[19%]'>
                    <FollowButton user={data!.getUserByUsername!!} />
                </div>
            )}
            <UserStats
                userId={data?.getUserByUsername?.id!}
                followers={data?.getUserByUsername?.followers!}
                following={data?.getUserByUsername?.following!}
            />
        </div>
    );
};

export default UserProfile;

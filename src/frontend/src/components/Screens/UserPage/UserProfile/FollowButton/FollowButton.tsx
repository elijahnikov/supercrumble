import {
    CheckIfFollowingUserDocument,
    CheckIfFollowingUserQuery,
    FollowMutation,
    useCheckIfFollowingUserLazyQuery,
    useCheckIfFollowingUserQuery,
    useFollowMutation,
    UserFragmentFragment,
} from '@/generated/graphql';
import clxsm from '@/lib/clsxm';
import { ApolloCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

interface FollowButtonProps {
    user: UserFragmentFragment;
}

const FollowButton = ({ user }: FollowButtonProps) => {
    const [following, setFollowing] = useState(false);
    const [follow] = useFollowMutation();
    const { data: isFollowing } = useCheckIfFollowingUserQuery({
        variables: {
            userId: user.id,
        },
    });

    useEffect(() => {
        console.log(isFollowing);
        setFollowing(isFollowing!.checkIfFollowingUser);
    }, [isFollowing]);

    const handleFollow = async () => {
        await follow({
            variables: {
                userId: user.id,
            },
        });
        setFollowing(!following);
    };

    return (
        <div
            onClick={() => {
                handleFollow();
            }}
            className={clxsm(
                'ml-10 inline-flex items-center rounded px-4 py-2 font-semibold',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                'shadow-sm',
                'justify-center',
                'cursor-pointer',
                'transition-colors duration-200',
                [
                    !following && [
                        'bg-superRed text-white',
                        'border-none',
                        'text-center',
                        'hover:bg-red-400 hover:text-white',
                        'disabled:bg-red-400 disabled:hover:bg-red-400',
                    ],
                ],
                [
                    following && [
                        'bg-gray-800 text-white',
                        'border-none',
                        'text-center',
                        'hover:bg-gray-600 hover:text-white',
                        'disabled:bg-gray-600 disabled:hover:bg-gray-600',
                    ],
                ]
            )}
        >
            {following ? 'Unfollow' : 'Follow'}
        </div>
    );
};

export default FollowButton;

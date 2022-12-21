import {
    FollowMutation,
    useFollowMutation,
    UserFragmentFragment,
} from '@/generated/graphql';
import clxsm from '@/lib/clsxm';
import { ApolloCache, gql } from '@apollo/client';

interface FollowButtonProps {
    user: UserFragmentFragment;
}

const updateAfterFollow = (
    value: number,
    userId: number,
    cache: ApolloCache<FollowMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        following: number;
        followers: number;
        followStatus: number | null;
    }>({
        id: 'User:' + userId,
        fragment: gql`
            fragment _ on User {
                id
                following
                followers
                followStatus
            }
        `,
    });

    if (data) {
        if (data.followStatus === value) {
            return;
        }
        // const newFollowing = (data.following as number) + value;
        const newFollowers = (data.followers as number) + value;

        cache.writeFragment({
            id: 'User:' + userId,
            fragment: gql`
                fragment __ on User {
                    followers
                    followStatus
                }
            `,
            data: {
                // following: newFollowing,
                followers: newFollowers,
                followStatus: value,
            },
        });
    }
};

const FollowButton = ({ user }: FollowButtonProps) => {
    const [follow] = useFollowMutation();

    const followHandler = async () => {
        await follow({
            variables: {
                userId: user.id,
                value: 1,
            },
            update: (cache) => updateAfterFollow(status, user.id, cache),
        });
    };

    let status = 0;
    if (user.followStatus === 1) {
        status = -1;
    } else {
        status = 1;
    }

    return (
        <div className='flex'>
            <div>
                <div
                    onClick={followHandler}
                    className={clxsm(
                        'inline-flex items-center rounded px-4 py-2 font-semibold',
                        'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                        'shadow-sm',
                        'justify-center',
                        'cursor-pointer',
                        'transition-colors duration-75',
                        [
                            user.followStatus !== 1 && [
                                'bg-superRed text-white',
                                'border-none',
                                'text-center',
                                'hover:bg-red-400 hover:text-white',
                                'disabled:bg-red-400 disabled:hover:bg-red-400',
                            ],
                        ],
                        [
                            user.followStatus === 1 && [
                                'bg-gray-800 text-white',
                                'border-none',
                                'text-center',
                                'hover:bg-gray-600 hover:text-white',
                                'disabled:bg-gray-600 disabled:hover:bg-gray-600',
                            ],
                        ]
                    )}
                >
                    {user.followStatus === 1 ? 'Unfollow' : 'Follow'}
                </div>
            </div>
        </div>
    );
};

export default FollowButton;

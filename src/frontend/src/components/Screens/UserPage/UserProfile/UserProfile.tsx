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
        <div className='bg-red-400'>
            <p>profile</p>
        </div>
    );
};

// {!isCurrentUser ? (
//     <FollowButton user={data.getUserByUsername!!} />
// ) : null}

export default UserProfile;

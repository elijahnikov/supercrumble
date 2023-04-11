import { GetUserByUsernameQuery } from '@/generated/graphql';
import RecentReviews from './RecentReviews/RecentReviews';
import Stats from './Stats/Stats';

interface ProfileTabProps {
    data: GetUserByUsernameQuery;
}

const ProfileTab = ({ data }: ProfileTabProps) => {
    if (!data.getUserByUsername) {
        return <div>data not found</div>;
    }

    const {
        followers,
        following,
        totalListsCreated,
        totalFilmsWatched,
        totalHoursWatched,
    } = data?.getUserByUsername;

    return (
        <div>
            {data && (
                <Stats
                    stats={{
                        followers,
                        following,
                        totalListsCreated,
                        totalFilmsWatched,
                        totalHoursWatched,
                    }}
                />
            )}
            <RecentReviews username={data.getUserByUsername.username} />
        </div>
    );
};

export default ProfileTab;

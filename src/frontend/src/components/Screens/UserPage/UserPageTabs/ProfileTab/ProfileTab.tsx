import { GetUserByUsernameQuery } from '@/generated/graphql';
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
        </div>
    );
};

export default ProfileTab;

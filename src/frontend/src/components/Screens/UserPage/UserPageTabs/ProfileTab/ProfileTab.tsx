import {
    GetUserByUsernameQuery,
    useNumberOfWatchedByYearQuery,
} from '@/generated/graphql';

interface ProfileTabProps {
    data: GetUserByUsernameQuery;
}

const ProfileTab = ({ data }: ProfileTabProps) => {
    const { data: watched } = useNumberOfWatchedByYearQuery({
        variables: {
            year: new Date().getFullYear().toString(),
        },
    });

    return (
        <div className='mt-5 flex rounded-md border border-slate-800 bg-blue-400'>
            <div className='flex bg-red-400'>
                <div>
                    <h1>{data.getUserByUsername?.totalFilmsWatched}</h1>
                </div>
                <div></div>
                {/* <h1>{data.getUserByUsername?.followers}</h1>
                <h1>{data.getUserByUsername?.following}</h1> */}
            </div>
        </div>
    );
};

export default ProfileTab;

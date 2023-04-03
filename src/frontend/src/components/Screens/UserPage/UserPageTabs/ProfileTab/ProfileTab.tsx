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
        <div className='mt-5 flex rounded-md border border-slate-800'>
            <div>
                <h1>{watched?.numberOfWatchedByYear}</h1>
                <h1>{data.getUserByUsername?.followers}</h1>
                <h1>{data.getUserByUsername?.following}</h1>
            </div>
        </div>
    );
};

export default ProfileTab;

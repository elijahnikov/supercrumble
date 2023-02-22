import Layout from '@/components/Common/Layout/Layout';
import UserPageTabs from '@/components/Screens/UserPage/UserPageTabs/UserPageTabs';
import UserProfileMini from '@/components/Screens/UserPage/UserProfileMini/UserProfileMini';
import { useMeQuery } from '@/generated/graphql';
import { getUsernameFromURL } from '@/utils/getUsernameFromURL';
import { withApollo } from '@/utils/withApollo';
import { useEffect, useState } from 'react';

interface UserReviewPageProps {}

const UserReviewPage = ({}: UserReviewPageProps) => {
    const { data, error, loading } = getUsernameFromURL();
    const { data: me, error: meError, loading: meLoading } = useMeQuery();

    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && data?.getUserByUsername?.id === me?.me?.id) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    }, []);

    if (!data?.getUserByUsername) {
        return <h1 className='text-white'>usernotfound</h1>;
    }

    return (
        <Layout showNavBar={true}>
            <div className='mb-20 flex justify-center'>
                {!loading && data && (
                    <UserProfileMini
                        isCurrentUser={isCurrentUser}
                        data={data}
                    />
                )}
                <UserPageTabs
                    username={
                        !loading && data ? data.getUserByUsername.username : ''
                    }
                />
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(UserReviewPage);
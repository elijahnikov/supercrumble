// Components
import Layout from '@/components/Common/Layout/Layout';
import UserPageTabs from '@/components/Screens/UserPage/UserPageTabs/UserPageTabs';
import UserProfile from '@/components/Screens/UserPage/UserProfile/UserProfile';

// GraphQL
import { useMeQuery } from '@/generated/graphql';
import { getUsernameFromURL } from '@/utils/getUsernameFromURL';

// Utils
import { withApollo } from '@/utils/withApollo';

interface UserPageProps {}

const UserPage = ({}: UserPageProps) => {
    const { data, error, loading } = getUsernameFromURL();
    const { data: me, error: meError, loading: meLoading } = useMeQuery();

    if (!data?.getUserByUsername) {
        return <h1 className='text-white'>usernotfound</h1>;
    }

    return (
        <Layout showNavBar={true}>
            <div className='mb-20 flex justify-center'>
                <div className='mediumPageFrame h-[100vh]  text-center'>
                    {data && <UserProfile data={data} />}
                    <UserPageTabs username={data.getUserByUsername.username} />
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(UserPage);

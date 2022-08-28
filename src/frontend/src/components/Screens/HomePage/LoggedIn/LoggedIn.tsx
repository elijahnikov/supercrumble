import Layout from '@/components/Common/Layout/Layout';

interface LoggedInProps {}

const LoggedIn = ({}: LoggedInProps) => {
    return (
        <Layout showNavBar={true} showSearch={true}>
            <div className='relative h-[73vh] '></div>
        </Layout>
    );
};

export default LoggedIn;

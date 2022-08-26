import Layout from '@/components/Common/Layout/Layout';
import { withApollo } from '@/utils/withApollo';

interface filmsProps {}

const films = ({}: filmsProps) => {
    return (
        <Layout showNavBar={true}>
            <div></div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(films);

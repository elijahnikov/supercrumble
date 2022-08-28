import Button from '@/components/Common/Button/Button';
import Layout from '@/components/Common/Layout/Layout';
import CreateListModal from '@/components/CreateListModal/CreateListModal';
import { LISTS_BACKGROUND_IMAGE } from '@/utils/consts';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';

interface ListsPageProps {}

const ListsPage = ({}: ListsPageProps) => {
    const router = useRouter();

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={LISTS_BACKGROUND_IMAGE}
        >
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame h-[100vh] text-center'>
                    <h1 className='mt-20'>
                        Your place to organise <br /> what you want to see most.
                    </h1>
                    <CreateListModal />
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListsPage);

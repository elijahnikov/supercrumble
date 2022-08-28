import Button from '@/components/Common/Button/Button';
import Layout from '@/components/Common/Layout/Layout';
import { LISTS_BACKGROUND_IMAGE } from '@/utils/consts';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';

interface ListsPageProps {}

const ListsPage = ({}: ListsPageProps) => {
    const router = useRouter();

    return (
        <Layout showNavBar={true} backgroundImage={LISTS_BACKGROUND_IMAGE}>
            <div className='mt-20 flex w-[100%] justify-center text-center'>
                <div className='mx-auto mt-20 h-[100vh] justify-center'>
                    <h1>Organise what you want to see most.</h1>
                    <Button className='mx-auto mt-5'>Create a new list</Button>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListsPage);

import { withApollo } from '@/utils/withApollo';

interface ListPageProps {}

const ListPage = ({}: ListPageProps) => {
    return <div className='text-white'>id page</div>;
};

export default withApollo({ ssr: true })(ListPage);

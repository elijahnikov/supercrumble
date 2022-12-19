// Utils
import Layout from '@/components/Common/Layout/Layout';
import { withApollo } from '@/utils/withApollo';

// Router
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface indexProps {}

const ListsByTag = ({}: indexProps) => {
    const router = useRouter();

    const [tagName, setTagName] = useState('');

    useEffect(() => {
        setTagName(typeof router.query.id === 'string' ? router.query.id : '');
    }, []);

    return (
        <Layout showNavBar={true}>
            <h1>{tagName}</h1>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListsByTag);

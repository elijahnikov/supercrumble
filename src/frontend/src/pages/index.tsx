import Layout from '@/components/Common/Layout/Layout';
import NavBar from '@/components/Common/NavBar/NavBar';
import HomePage from '@/components/Screens/HomePage/HomePage';
import { useMeQuery } from '@/generated/graphql';
import { withApollo } from '@/utils/withApollo';
import * as React from 'react';

const Home = () => {

    const {data, loading, error} = useMeQuery()

    return (
        <HomePage/>
    )
}

export default withApollo({ssr: true})(Home);
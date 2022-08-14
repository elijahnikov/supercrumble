import NavBar from '@/components/Common/NavBar/NavBar';
import { useMeQuery } from '@/generated/graphql';
import { withApollo } from '@/utils/withApollo';
import * as React from 'react';

const HomePage = () => {

    const {data, loading, error} = useMeQuery()

    return (
        <NavBar userData={data!!}/>
    )
}

export default withApollo({ssr: true})(HomePage);
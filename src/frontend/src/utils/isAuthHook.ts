import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMeQuery } from '../generated/graphql';

//hook to use when user is accessing page that requires them to be logged on
export const isAuthHook = () => {
    const { data, loading } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !data?.me) {
            //replaces router with login and has next location as param
            //to navigate to page user wished to go to in the first place
            router.replace('/login?next=' + router.pathname);
        }
    }, [loading, data, router]);
};

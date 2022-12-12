import { useRouter } from 'next/router';

export const getListIntId = () => {
    const router = useRouter();
    let intId = typeof router.query.id === 'string' ? router.query.id : '';
    return intId;
};

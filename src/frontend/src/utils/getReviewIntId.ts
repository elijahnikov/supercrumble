import { useRouter } from 'next/router';

export const getReviewIntId = () => {
    const router = useRouter();
    const intId = typeof router.query.id === 'string' ? router.query.id : '';
    return intId;
};

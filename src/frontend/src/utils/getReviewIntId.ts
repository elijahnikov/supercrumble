import { useRouter } from 'next/router';

export const getReviewIntId = () => {
    const router = useRouter();
    let intId = typeof router.query.id === 'string' ? router.query.id : '';
    return intId;
};

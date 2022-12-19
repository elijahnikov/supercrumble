import { useRouter } from 'next/router';

export const getUsername = () => {
    const router = useRouter();
    const name =
        typeof router.query.username === 'string' ? router.query.username : '';
    return name.substring(1);
};

import { useFilmListQuery } from '@/generated/graphql';
import { getListIntId } from './getListIntId';

export const getListFromURL = () => {
    const intId = getListIntId();
    return useFilmListQuery({
        skip: intId === '',
        variables: {
            id: parseInt(intId),
            limit: 10,
        },
    });
};

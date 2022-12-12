import { useFilmListQuery } from '@/generated/graphql';
import { getListIntId } from './getListId';

export const getListFromURL = () => {
    const id = getListIntId();
    return useFilmListQuery({
        skip: id === '',
        variables: {
            id,
            limit: 10,
        },
    });
};

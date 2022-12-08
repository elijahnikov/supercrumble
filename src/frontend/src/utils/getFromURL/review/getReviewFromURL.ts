import { getReviewIntId } from './getReviewIntId';
import { useReviewQuery } from '../../../generated/graphql';

export const getReviewFromURL = () => {
    const intId = getReviewIntId();
    return useReviewQuery({
        skip: intId === '',
        variables: {
            id: intId,
        },
    });
};

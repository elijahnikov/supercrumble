import { getUsername } from './getUsername';
import { useGetUserByUsernameQuery } from '../generated/graphql';

export const getUsernameFromURL = () => {
    const user = getUsername();
    return useGetUserByUsernameQuery({
        variables: {
            username: user,
        },
    });
};

import { PaginatedReviewComments } from '@/generated/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

import { createWithApollo } from './createWithApollo';
import { isServer } from './isServer';

export const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: 'http://localhost:4000/graphql', //CHANGE TO ENV VARIABLE
        credentials: 'include',
        headers: {
            cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || '',
        },
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        reviewComments: {
                            keyArgs: [],
                            merge(existing: PaginatedReviewComments | undefined, incoming: PaginatedReviewComments): PaginatedReviewComments{
                                return {
                                    ...incoming,
                                    reviewComments: [...(existing?.reviewComments || []), ...incoming.reviewComments]
                                }
                            }
                        }
                    },
                },
            },
        }),
    });

export const withApollo = createWithApollo(createClient);

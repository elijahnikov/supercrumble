import {
    ReviewSnippetFragment,
    useVoteMutation,
    VoteMutation,
} from '@/generated/graphql';
import { kFormatter } from '@/utils/kFormatter';
import { ApolloCache, gql } from '@apollo/client';
import React from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

interface UpvoteButtonProps {
    review: ReviewSnippetFragment;
    variant: 'small' | 'regular' | 'med';
}

const updateAfterVote = (
    value: number,
    reviewId: number,
    cache: ApolloCache<VoteMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        score: number;
        voteStatus: number | null;
    }>({
        id: 'Review:' + reviewId,
        fragment: gql`
            fragment _ on Review {
                id
                score
                voteStatus
            }
        `,
    });

    if (data) {
        if (data.voteStatus === value) {
            return;
        }
        const newScore = (data.score as number) + value;
        cache.writeFragment({
            id: 'Review:' + reviewId,
            fragment: gql`
                fragment __ on Review {
                    score
                    voteStatus
                }
            `,
            data: { score: newScore, voteStatus: value },
        });
    }
};

const UpvoteButton = ({ review, variant }: UpvoteButtonProps) => {
    const [vote] = useVoteMutation();

    const voteHandler = async () => {
        await vote({
            variables: {
                reviewId: review.id,
                value: 1,
            },
            update: (cache) => updateAfterVote(status, review.id, cache),
        });
    };

    let status = 0;
    if (review.voteStatus === 1) {
        status = -1;
    } else {
        status = 1;
    }

    return (
        <div className='flex'>
            <div>
                <div
                    onClick={voteHandler}
                    className={`inline hover:bg-scBlack-100 float-left 
                    rounded-md p-1 text-gray-400 hover:cursor-pointer hover:text-white `}
                >
                    <BsFillHeartFill
                        className={`
                            ${
                                review.voteStatus === 1
                                    ? 'fill-superRed'
                                    : 'fill-gray-600'
                            }`}
                    />
                </div>
                {variant === 'small' ? (
                    <p className='inline float-right ml-2 mt-[2px] text-[12px] text-white'>
                        {kFormatter(review.score)} likes
                    </p>
                ) : (
                    <p className={`inline float-right ml-4 text-lg text-white`}>
                        {kFormatter(review.score)}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UpvoteButton;

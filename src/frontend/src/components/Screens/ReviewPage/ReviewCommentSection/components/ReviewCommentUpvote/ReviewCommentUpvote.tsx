import {
    ReviewCommentSnippetFragment,
    ReviewCommentVoteMutation,
    useReviewCommentVoteMutation,
} from '@/generated/graphql';
import { ApolloCache, gql } from '@apollo/client';
import { BsFillHeartFill } from 'react-icons/bs';

interface ReviewCommentUpvoteProps {
    reviewComment?: ReviewCommentSnippetFragment;
}

const updateAfterVote = (
    value: number,
    reviewCommentId: number,
    cache: ApolloCache<ReviewCommentVoteMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        score: number;
        voteStatus: number | null;
    }>({
        id: 'ReviewComment:' + reviewCommentId,
        fragment: gql`
            fragment _ on ReviewComment {
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
            id: 'ReviewComment:' + reviewCommentId,
            fragment: gql`
                fragment __ on ReviewComment {
                    score
                    voteStatus
                }
            `,
            data: { score: newScore, voteStatus: value },
        });
    }
};

const ReviewCommentUpvote = ({ reviewComment }: ReviewCommentUpvoteProps) => {
    const [vote] = useReviewCommentVoteMutation();

    let status = 0;
    if (reviewComment?.voteStatus === 1) {
        status = -1;
    } else {
        status = 1;
    }

    return (
        <div className='flex items-center'>
            <div>
                <BsFillHeartFill
                    className={`h-4 w-4 cursor-pointer
                        ${
                            reviewComment?.voteStatus === 1
                                ? 'fill-superRed'
                                : 'fill-gray-600'
                        }
                    `}
                    onClick={async () => {
                        await vote({
                            variables: {
                                reviewCommentId: reviewComment?.id!!,
                                value: 1,
                            },
                            update: (cache) =>
                                updateAfterVote(
                                    status,
                                    reviewComment?.id!!,
                                    cache
                                ),
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default ReviewCommentUpvote;

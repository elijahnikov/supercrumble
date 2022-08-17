import Button from '@/components/Common/Button/Button';
import InputArea from '@/components/Common/InputArea/InputArea';
import {
    MeQuery,
    ReviewCommentsDocument,
    ReviewCommentSnippetFragment,
    ReviewSnippetFragment,
    useCreateReviewCommentMutation,
} from '@/generated/graphql';
import { useState } from 'react';
import { BsFillReplyFill } from 'react-icons/bs';

interface ReviewCommentReplyProps {
    review: ReviewSnippetFragment;
    parentComment: ReviewCommentSnippetFragment;
    user: MeQuery;
}

const ReviewCommentReply = ({
    review,
    parentComment,
    user,
}: ReviewCommentReplyProps) => {
    const [showReply, setShowReply] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [createComment] = useCreateReviewCommentMutation({
        refetchQueries: [{ query: ReviewCommentsDocument }, 'ReviewComments'],
    });

    return (
        <>
            <BsFillReplyFill
                onClick={() => setShowReply(!showReply)}
                className='h-5 w-5 cursor-pointer fill-gray-500'
            />
            {showReply && (
                <div className='mt-5'>
                    <InputArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={`Reply as ${user?.me?.username}`}
                        className='h-[100px] w-[100%]'
                    />
                    <div className='mt-3'>
                        <Button
                            className='float-right h-7 text-sm'
                            onClick={() => {
                                createComment({
                                    variables: {
                                        input: {
                                            reviewId: review.id,
                                            text: commentText,
                                            parentId: parentComment.id,
                                        },
                                    },
                                });
                                setCommentText('');
                            }}
                        >
                            Post
                        </Button>
                        <Button
                            className='float-right mr-4 h-7 text-sm'
                            variant='secondary'
                            onClick={() => {
                                setCommentText('');
                                setShowReply(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewCommentReply;

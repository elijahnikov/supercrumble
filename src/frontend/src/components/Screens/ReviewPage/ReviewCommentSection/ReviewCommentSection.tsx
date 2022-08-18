import Button from '@/components/Common/Button/Button';
import InputArea from '@/components/Common/InputArea/InputArea';
import {
    MeQuery,
    ReviewCommentsDocument,
    ReviewCommentsQuery,
    ReviewSnippetFragment,
    useCreateReviewCommentMutation,
    useDeleteReviewCommentMutation,
    useReviewCommentsQuery,
} from '@/generated/graphql';
import { epochToDateTime } from '@/utils/EpochToDateTime';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { BsFillReplyFill, BsThreeDots } from 'react-icons/bs';
import ReviewCommentUpvote from './components/ReviewCommentUpvote/ReviewCommentUpvote';

interface ReviewCommentSectionProps {
    user: MeQuery;
    review: ReviewSnippetFragment;
    parentId?: number;
}

const ReviewCommentSection = ({
    user,
    review,
    parentId,
}: ReviewCommentSectionProps) => {
    const [commentText, setCommentText] = useState('');
    const [originalCommentData, setOriginalCommentData] = useState({});
    const [formattedCommentData, setFormattedCommentData] =
        useState<ReviewCommentsQuery | null>(null);
    const [createComment] = useCreateReviewCommentMutation({
        refetchQueries: [{ query: ReviewCommentsDocument }, 'ReviewComments'],
    });
    const [deleteComment] = useDeleteReviewCommentMutation({
        refetchQueries: [{ query: ReviewCommentsDocument }, 'ReviewComments'],
    });
    const {
        data: commentsData,
        loading,
        error,
        fetchMore,
        variables,
    } = useReviewCommentsQuery({
        variables: {
            reviewId: review.id,
            limit: 10,
            cursor: null as null | string,
        },
    });

    return (
        <div className='p-5'>
            <div className='mb-10'>
                <InputArea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Reply as ${user?.me?.username}`}
                    className='h-[100px]'
                />
                <Button
                    className='float-right h-7 text-sm'
                    onClick={() => {
                        createComment({
                            variables: {
                                input: {
                                    reviewId: review.id,
                                    text: commentText,
                                    parentId: null,
                                },
                            },
                        });
                        setCommentText('');
                    }}
                >
                    Post
                </Button>
                <div className='relative mt-[70px]'>
                    {commentsData?.reviewComments.reviewComments
                        .filter((obj) => {
                            return !obj.parentId;
                        })
                        .map((d) => (
                            <div
                                key={d.id}
                                className='mb-2 border-b-[1px] border-crumble-100 p-4 text-white'
                            >
                                <div className='mb-5 inline'>
                                    <img
                                        className='inline h-[20px] w-[20px] rounded-full object-cover'
                                        src={d.creator.avatar!!}
                                    />
                                    <p className='ml-2 inline text-sm text-gray-500'>
                                        {d.creator.username} says,
                                    </p>
                                    <p className='float-right ml-2 mt-2 inline text-xs text-gray-500'>
                                        {epochToDateTime(d.createdAt)}
                                    </p>

                                    <br />
                                    <p className='mt-4'>{d.text}</p>
                                    <br />

                                    <div className='mt-[20px] inline-block'>
                                        <div className='float-left mt-1 inline'>
                                            <ReviewCommentUpvote
                                                reviewComment={d}
                                            />
                                        </div>
                                        <p className='ml-2 inline text-sm text-gray-400'>
                                            {d.score}
                                        </p>
                                        {/* <div className='float-right ml-2 ml-[20px] mt-[2px] inline w-[400px]'>
                                            <ReviewCommentReply
                                                review={review}
                                                parentComment={d}
                                                user={user}
                                            />
                                        </div> */}
                                    </div>
                                    <Menu
                                        as='div'
                                        className='z-100 relative top-6 float-right text-left'
                                    >
                                        <div>
                                            <Menu.Button>
                                                <BsThreeDots className='cursor-pointer fill-gray-500' />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                <div className='px-1 py-1 '>
                                                    {user.me?.id ===
                                                        d.creator.id && (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() =>
                                                                        deleteComment(
                                                                            {
                                                                                variables:
                                                                                    {
                                                                                        id: d.id,
                                                                                        reviewId:
                                                                                            review.id,
                                                                                    },
                                                                            }
                                                                        )
                                                                    }
                                                                    className={`${
                                                                        active
                                                                            ? 'bg-crumble-100 text-superRed'
                                                                            : 'text-superRed'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    )}
                                                    {user.me?.id !==
                                                        d.creator.id && (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${
                                                                        active
                                                                            ? 'bg-crumble-100 text-white'
                                                                            : 'text-gray-200'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                >
                                                                    Report
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    )}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        ))}
                    {commentsData && commentsData.reviewComments.hasMore ? (
                        <div className='flex'>
                            <Button
                                className='mx-auto mt-2'
                                onClick={() => {
                                    fetchMore({
                                        variables: {
                                            limit: variables?.limit,
                                            cursor: commentsData.reviewComments
                                                .reviewComments[
                                                commentsData.reviewComments
                                                    .reviewComments.length - 1
                                            ].createdAt,
                                        },
                                    });
                                }}
                                isLoading={loading}
                            >
                                Load More
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ReviewCommentSection;

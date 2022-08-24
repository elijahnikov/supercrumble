import UpvoteButton from '@/components/Screens/ReviewPage/UpvoteButton/UpvoteButton';
import { ReviewsQuery, useReviewsQuery } from '@/generated/graphql';
import { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';

interface ReviewSectionProps {
    movieId: number;
}

const ReviewSection = ({ movieId }: ReviewSectionProps) => {
    const { data: popularReviews } = useReviewsQuery({
        variables: {
            limit: 3,
            cursor: null as null | string,
            movieId: movieId,
            orderBy: 'score',
            orderDir: 'DESC',
        },
    });

    const { data: recentReviews } = useReviewsQuery({
        variables: {
            limit: 3,
            cursor: null as null | string,
            movieId: movieId,
            orderBy: 'createdAt',
            orderDir: 'DESC',
        },
    });

    if (!popularReviews) {
        return <div>no reviews</div>;
    }

    if (!recentReviews) {
        return <div>no reviews</div>;
    }

    return (
        <div>
            {popularReviews.reviews.reviews.length > 0 ? (
                <>
                    <div className='border-b-[1px] border-gray-600 p-1'>
                        <p className='inline text-xs text-gray-500'>
                            POPULAR REVIEWS
                        </p>
                        <p className='float-right mt-[6px] inline text-xs text-gray-500'>
                            MORE
                        </p>
                    </div>
                    <div>
                        {popularReviews.reviews.reviews.map((review) => (
                            <div className='mb-1 mt-1 rounded-md border-b-[1px] border-gray-800 p-4'>
                                <div className='inline-block'>
                                    <img
                                        src={review.creator.avatar!!}
                                        className='mr-2 inline h-8 w-8 rounded-full object-fill'
                                    />
                                </div>
                                <div className='ml-2 inline'>
                                    <p className='inline text-[13px] text-gray-400'>
                                        Review by{' '}
                                    </p>
                                    <p className='inline cursor-pointer text-[13px] font-bold hover:underline'>
                                        {review.creator.username}
                                    </p>
                                    <Rating
                                        className='mb-2 mt-1 ml-2 navBarCollapse:ml-2'
                                        ratingValue={0}
                                        allowHalfIcon={true}
                                        initialValue={review.ratingGiven}
                                        size={12}
                                        fillColor={'#FD4443'}
                                        onClick={undefined}
                                        readonly
                                    />
                                    <p className='ml-[51px] text-sm text-gray-300'>
                                        {review.text}
                                    </p>
                                    <div className='ml-[50px] mt-3'>
                                        <UpvoteButton
                                            review={review}
                                            variant={'small'}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
            <br />
            <br />
            {recentReviews.reviews.reviews.length > 0 ? (
                <>
                    <div className='border-b-[1px] border-gray-600 p-1'>
                        <p className='inline text-xs text-gray-500'>
                            RECENT REVIEWS
                        </p>
                        <p className='float-right mt-[6px] inline text-xs text-gray-500'>
                            MORE
                        </p>
                    </div>
                    <div>
                        {recentReviews.reviews.reviews.map((review) => (
                            <div className='mb-1 mt-1 rounded-md border-b-[1px] border-gray-800 p-4'>
                                <div className='inline-block'>
                                    <img
                                        src={review.creator.avatar!!}
                                        className='mr-2 inline h-8 w-8 rounded-full object-fill'
                                    />
                                </div>
                                <div className='ml-2 inline'>
                                    <p className='inline text-[13px] text-gray-400'>
                                        Review by{' '}
                                    </p>
                                    <p className='inline cursor-pointer text-[13px] font-bold hover:underline'>
                                        {review.creator.username}
                                    </p>
                                    <Rating
                                        className='mb-2 mt-1 ml-2 navBarCollapse:ml-2'
                                        ratingValue={0}
                                        allowHalfIcon={true}
                                        initialValue={review.ratingGiven}
                                        size={12}
                                        fillColor={'#FD4443'}
                                        onClick={undefined}
                                        readonly
                                    />
                                    <p className='ml-[51px] text-sm text-gray-300'>
                                        {review.text}
                                    </p>
                                    <div className='ml-[50px] mt-3'>
                                        <UpvoteButton
                                            review={review}
                                            variant={'small'}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ReviewSection;

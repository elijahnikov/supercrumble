import { useState } from 'react';

// Components
import UpvoteButton from '@/components/Screens/ReviewPage/UpvoteButton/UpvoteButton';
import CreateReviewModal from '@/components/Common/CreateReviewModal/CreateReviewModal';
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';

// Utils
import { formatForURL } from '@/utils/url/formatForURL';
import { epochToDate } from '@/utils/EpochToDate';
import { kFormatter } from '@/utils/general';
import { getUsername } from '@/utils/getUsername';
import { useReviewsQuery } from '@/generated/graphql';

// Router
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// Types
import { ReviewType } from './reviewType';

// React Icons
import { BiComment } from 'react-icons/bi';
import Button from '@/components/Common/Button/Button';
import { Rating } from 'react-simple-star-rating';

interface ReviewTabProps {}

interface ReviewProps {
    data: ReviewType;
}

const ReviewTab = ({}: ReviewTabProps) => {
    const username = getUsername();

    const [reviewOpen, setReviewOpen] = useState<boolean>(false);

    const { data, loading, error, fetchMore, variables } = useReviewsQuery({
        variables: {
            limit: 10,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    return (
        <>
            <div>
                <SecondaryUserPageTabs />
                <br />
                <div className='mt-[100px] mb-[100px]'>
                    {loading && <p>loading...</p>}
                    {data && data?.reviews.reviews.length > 0 ? (
                        <div>
                            <div>
                                {!loading &&
                                    data &&
                                    data.reviews.reviews.map((reviews) => (
                                        <Review
                                            key={reviews.id}
                                            data={reviews}
                                        />
                                    ))}
                            </div>
                            <div>
                                {data && data.reviews.hasMore ? (
                                    <div>
                                        <Button
                                            className='mx-auto mt-4'
                                            onClick={() => {
                                                fetchMore({
                                                    variables: {
                                                        limit: variables?.limit,
                                                        cursor: data.reviews
                                                            .reviews[
                                                            data.reviews.reviews
                                                                .length - 1
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
                    ) : (
                        <>
                            <div className='mt-[20px] h-[150px] rounded-md border border-slate-800 text-center'>
                                <div className='mt-[30px] w-full justify-center text-center'>
                                    <div className='inline w-full text-slate-400'>
                                        <h4 className='mb-[-20px] text-white'>
                                            You haven't added any reviews.
                                        </h4>
                                        <CreateReviewModal
                                            fromMenu={false}
                                            open={reviewOpen}
                                            setOpen={setReviewOpen}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <br />
        </>
    );
};

const Review = ({ data }: ReviewProps) => {
    const router = useRouter();

    return (
        <div className='mt-5 w-full rounded-lg border border-slate-800 p-5 '>
            <div className='flex'>
                <div>
                    {data.movie_poster ? (
                        <NextLink
                            href='/film/[id]'
                            as={`/film/${formatForURL(
                                data.movie_title.toString()
                            )}-${data.movieId}`}
                        >
                            <img
                                className={`max-w-[100px] rounded-md hover:outline hover:outline-superRed `}
                                src={
                                    data.movie_poster
                                        ? `https://image.tmdb.org/t/p/w500${data.movie_poster}`
                                        : undefined
                                }
                            />
                        </NextLink>
                    ) : (
                        <p>?</p>
                    )}
                </div>
                <div className='relative mt-2 ml-5 w-full'>
                    <div className='flex w-full'>
                        <div className='flex w-full'>
                            <h4>{data.movie_title}</h4>
                            <h4 className='mb-1 ml-2 font-semibold text-superRed'>
                                {data.movie_release_year}
                            </h4>
                            <div className='ml-3 mt-[-3px]'>
                                <Rating
                                    allowFraction={true}
                                    size={20}
                                    fillColor={'#FD4443'}
                                    initialValue={data.ratingGiven}
                                />
                            </div>
                        </div>
                        <span className='w-[200px] text-xs text-slate-400'>
                            {epochToDate(data.createdAt)}
                        </span>
                    </div>
                    <div className='w-[80%] text-left'>
                        <div>
                            {data.text.length > 200 ? (
                                <div>
                                    <span>{data.text.slice(0, 190)}...</span>
                                    <a
                                        onClick={() =>
                                            router.push(
                                                `/review/${data.referenceId}`
                                            )
                                        }
                                        className='ml-2 cursor-pointer text-sm text-superRed'
                                    >
                                        Read more
                                    </a>
                                </div>
                            ) : (
                                <span>{data.text}</span>
                            )}
                        </div>
                    </div>
                    <div className='absolute bottom-0 clear-both flex text-left text-slate-400'>
                        <UpvoteButton review={data} variant={'small'} />
                        <a
                            onClick={() =>
                                router.push(`/review/${data.referenceId}`)
                            }
                        >
                            <div className='ml-[20px] cursor-pointer'>
                                <BiComment className='mr-3 inline' />
                                <p className='mr-1 inline text-[12px] '>
                                    {data.noOfComments &&
                                        kFormatter(data.noOfComments)}{' '}
                                    comments
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewTab;

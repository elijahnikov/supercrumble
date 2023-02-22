import { ReviewsQuery, useReviewsQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { useRouter } from 'next/router';
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';
import { ReviewType } from './reviewType';
import NextLink from 'next/link';
import { formatForURL } from '@/utils/url/formatForURL';
import { epochToDate } from '@/utils/EpochToDate';
import { BiComment } from 'react-icons/bi';
import { kFormatter } from '@/utils/general';
import UpvoteButton from '@/components/Screens/ReviewPage/UpvoteButton/UpvoteButton';
import CreateReviewModal from '@/components/Common/CreateReviewModal/CreateReviewModal';
import { useState } from 'react';

interface ReviewTabProps {}

interface ReviewProps {
    data: ReviewType;
}

const ReviewTab = ({}: ReviewTabProps) => {
    const username = getUsername();
    const router = useRouter();

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
                <div className='mt-[100px]'>
                    {loading && <p>loading...</p>}
                    {data && data?.reviews.reviews.length > 0 ? (
                        <div>
                            {!loading &&
                                data &&
                                data.reviews.reviews.map((reviews) => (
                                    <Review key={reviews.id} data={reviews} />
                                ))}
                        </div>
                    ) : (
                        <div className='h-[125px] rounded-md border border-slate-800'>
                            <p className='mt-5 mb-[-20px]'>No reviews</p>
                            <CreateReviewModal
                                fromMenu={false}
                                open={reviewOpen}
                                setOpen={setReviewOpen}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const Review = ({ data }: ReviewProps) => {
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
                <div className='mt-2 ml-5 w-full'>
                    <div className='flex w-full'>
                        <div className='flex w-full'>
                            <h4>{data.movie_title}</h4>
                            <h4 className='mb-1 ml-2 font-semibold text-superRed'>
                                {data.movie_release_year}
                            </h4>
                        </div>
                        <span className='w-[200px] text-xs text-slate-400'>
                            {epochToDate(data.createdAt)}
                        </span>
                    </div>
                    <div className='text-left'>
                        <p className='mb-[5px] text-xs text-slate-400'>
                            You wrote...
                        </p>
                        <span>{data.text}</span>
                    </div>
                    <br />
                    <div className='clear-both mt-[15px] flex text-left text-slate-400'>
                        <UpvoteButton review={data} variant={'small'} />
                        <div className='ml-[20px] cursor-pointer'>
                            <BiComment className='mr-3 inline' />
                            <p className='mr-1 inline text-[12px] '>
                                {data.noOfComments &&
                                    kFormatter(data.noOfComments)}{' '}
                                comments
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewTab;

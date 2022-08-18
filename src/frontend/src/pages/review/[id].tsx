import Layout from '@/components/Common/Layout/Layout';
import ReviewCommentSection from '@/components/Screens/ReviewPage/ReviewCommentSection/ReviewCommentSection';
import UpvoteButton from '@/components/Screens/ReviewPage/UpvoteButton/UpvoteButton';
import { useMeQuery } from '@/generated/graphql';
import { epochToDate } from '@/utils/EpochToDate';
import { getReviewFromURL } from '@/utils/getReviewFromURL';
import { withApollo } from '@/utils/withApollo';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import NextLink from 'next/link';

interface ReviewPageProps {}

const ReviewPage = ({}) => {
    const { data, loading, error } = getReviewFromURL();
    const { data: meData, loading: meLoading } = useMeQuery();
    const [spoilerActive, setSpoilerActive] = useState(false);

    useEffect(() => {
        if (data?.review) setSpoilerActive(data.review.containsSpoilers);
    }, [data]);

    if (!data?.review) {
        return <h1>Post does not exist</h1>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <Layout showNavBar={true} showSearch={true}>
            {/* <div className="flex text-left w-[60%] navBarCollapse:max-w-2xl mx-auto">
                <h3 className="mt-10 mb-[-30px] text-white">Review</h3>
            </div> */}
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    <div>
                        <div className='p-5'>
                            {/* MOVIE POSTER */}
                            <div className='float-left w-[25%]'>
                                <NextLink
                                    href='/film/[id]'
                                    as={`/film/${data.review.movie_title.replace(
                                        /\s+/g,
                                        ''
                                    )}-${data.review.movieId}`}
                                >
                                    <img
                                        className='float-right mb-10 inline aspect-auto cursor-pointer rounded-md navBarCollapse2x:w-full'
                                        src={`https://image.tmdb.org/t/p/w500/${data.review.movie_poster}`}
                                    />
                                </NextLink>
                                <div className='float-left mt-[-20px] mb-10'>
                                    <UpvoteButton
                                        review={data.review}
                                        variant={'small'}
                                    />
                                </div>
                            </div>
                            {/* REVIEW DETAILS */}
                            <div className='float-left mb-10 ml-5 inline-block w-[71%] text-white'>
                                <div>
                                    <div>
                                        <img
                                            className='inline h-[25px] w-[25px] rounded-full object-cover'
                                            src={data.review.creator.avatar!!}
                                            alt='Profile image'
                                        />
                                        <p className='ml-3 inline text-sm'>
                                            Review by{' '}
                                        </p>
                                        <p className='inline text-sm font-bold'>
                                            {data.review.creator.username}
                                        </p>
                                    </div>
                                    <div className='mt-3'>
                                        <NextLink
                                            href='/film/[id]'
                                            as={`/film/${data.review.movie_title.replace(
                                                /\s+/g,
                                                ''
                                            )}-${data.review.movieId}}`}
                                        >
                                            <h3 className='mt-4 inline cursor-pointer text-white'>
                                                {data.review.movie_title}{' '}
                                            </h3>
                                        </NextLink>
                                        <h4 className='mt-4 inline text-superRed'>
                                            {data.review.movie_release_year}
                                        </h4>
                                        <Rating
                                            className='mb-2 ml-2 navBarCollapse:ml-2'
                                            ratingValue={0}
                                            allowHalfIcon={true}
                                            initialValue={
                                                data.review.ratingGiven
                                            }
                                            size={20}
                                            fillColor={'#FD4443'}
                                            onClick={undefined}
                                            readonly
                                        />
                                    </div>
                                    <div>
                                        <p className='inline text-xs text-slate-400'>
                                            Watched on{' '}
                                            {epochToDate(data.review.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-10 mb-20'>
                                    {data.review.containsSpoilers && (
                                        <p className='text-sm italic text-gray-500'>
                                            Contains spoilers...
                                        </p>
                                    )}
                                    <span
                                        className={`${
                                            data.review.containsSpoilers
                                                ? !spoilerActive
                                                    ? 'cursor-pointer text-white'
                                                    : 'active-text-red-400 cursor-pointer bg-superRed text-superRed'
                                                : 'bg-transparent text-white'
                                        }`}
                                        onClick={() =>
                                            setSpoilerActive(!spoilerActive)
                                        }
                                    >
                                        {data.review.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='relative top-10 mb-5 bg-superRed p-5'> */}
                    <ReviewCommentSection
                        user={meData!!}
                        review={data.review}
                    />
                    {/* </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ReviewPage);

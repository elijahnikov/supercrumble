import Layout from '@/components/Common/Layout/Layout';
import ReviewCommentSection from '@/components/Screens/ReviewPage/ReviewCommentSection/ReviewCommentSection';
import UpvoteButton from '@/components/Screens/ReviewPage/UpvoteButton/UpvoteButton';
import { useMeQuery } from '@/generated/graphql';
import { epochToDate } from '@/utils/EpochToDate';
import { getReviewFromURL } from '@/utils/getReviewFromURL';
import { withApollo } from '@/utils/withApollo';
import { useEffect, useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import NextLink from 'next/link';
import { formatForURL } from '@/utils/url/formatForURL';
import { kFormatter } from '@/utils/kFormatter';
import { BiComment } from 'react-icons/bi';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

interface ReviewPageProps {}

const ReviewPage = ({}) => {
    const { data, loading, error } = getReviewFromURL();
    const { data: meData, loading: meLoading } = useMeQuery();
    const [spoilerActive, setSpoilerActive] = useState(false);
    const myRef = useRef<any>(null);

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

    const ScrollDemo = () => {
        const executeScroll = () =>
            myRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
        // run this function from an event handler or an effect to execute scroll

        return (
            <>
                <div
                    onClick={executeScroll}
                    className='float-left mt-[-25px] inline-block cursor-pointer'
                >
                    <BiComment className='mr-3 ml-[90px] inline' />
                    <p className='mr-1 inline text-[12px] text-white'>
                        {kFormatter(data?.review?.noOfComments)} comments
                    </p>
                    <BsFillArrowDownCircleFill className='float-right ml-[10px] mt-[5px] inline' />
                </div>
            </>
        );
    };

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={data.review.backdrop}
        >
            {/* <div className="flex text-left w-[60%] navBarCollapse:max-w-2xl mx-auto">
                <h3 className="mt-10 mb-[-30px] text-white">Review</h3>
            </div> */}
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame'>
                    <div>
                        <div className='mt-[100px] p-5'>
                            {/* MOVIE POSTER */}
                            <br />
                            <div className=' float-left w-[25%]'>
                                <NextLink
                                    href='/film/[id]'
                                    as={`/film/${formatForURL(
                                        data.review.movie_title.toString()
                                    )}-${data.review.movieId}`}
                                >
                                    <img
                                        className=' inline aspect-auto h-[300px] cursor-pointer rounded-md '
                                        src={`https://image.tmdb.org/t/p/w500/${data.review.movie_poster}`}
                                    />
                                </NextLink>
                            </div>
                            {/* REVIEW DETAILS */}
                            <div className='float-left mt-[180px] mb-10  inline-block w-[71%] text-white'>
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
                                            as={`/film/${formatForURL(
                                                data.review.movie_title.toString()
                                            )}-${data.review.movieId}`}
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
                                <div className='float-left mt-[20px] inline-block'>
                                    <UpvoteButton
                                        review={data.review}
                                        variant={'small'}
                                    />
                                    {ScrollDemo()}
                                </div>

                                <div className='mt-[70px] mb-10'>
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
                                                : 'break-words bg-transparent text-white'
                                        }`}
                                        onClick={() =>
                                            setSpoilerActive(!spoilerActive)
                                        }
                                    >
                                        {data.review.text}
                                    </span>
                                </div>
                                <div className='mb-20'>
                                    {data.review.tags &&
                                        data.review.tags
                                            .split(',')
                                            .map((tag: string, i: number) => (
                                                <div
                                                    key={i}
                                                    className='mr-2 inline-block rounded-md bg-gray-800 p-1'
                                                >
                                                    <p className='text-xs text-gray-400'>
                                                        {tag}
                                                    </p>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='relative top-10 mb-5 bg-superRed p-5'> */}
                    <div>
                        <ReviewCommentSection
                            scrollToRef={myRef}
                            user={meData!!}
                            review={data.review}
                        />
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ReviewPage);

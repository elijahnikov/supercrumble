import { useReviewsQuery } from '@/generated/graphql';

interface RecentReviewsProps {
    username: string;
}

const RecentReviews = ({ username }: RecentReviewsProps) => {
    const { data, error, loading } = useReviewsQuery({
        variables: {
            limit: 4,
            username: username,
        },
    });

    if (loading) {
        return <div>loading</div>;
    }

    if (error) {
        return <div>error</div>;
    }

    return (
        <div className='mt-5'>
            <div>
                <p className='float-left ml-1 mb-1 text-sm text-slate-300'>
                    Recent Reviews
                </p>
            </div>
            <div className='flex w-[100%] rounded-md border border-slate-800 p-5'>
                {data &&
                    data.reviews.reviews.map((review) => (
                        <div key={review.id}>{review.text}</div>
                    ))}
            </div>
        </div>
    );
};

export default RecentReviews;

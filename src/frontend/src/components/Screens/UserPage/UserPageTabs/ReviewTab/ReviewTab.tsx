import { useReviewsQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import SecondaryUserPageTabs from '../SecondaryUserPageTabs/SecondaryUserPageTabs';

interface ReviewTabProps {}

const ReviewTab = ({}: ReviewTabProps) => {
    const username = getUsername();
    const router = useRouter();

    const { data, loading, error, fetchMore, variables } = useReviewsQuery({
        variables: {
            limit: 10,
            orderBy: 'createdAt',
            username: username,
            cursor: null as null | string,
        },
    });

    return (
        <div>
            <SecondaryUserPageTabs />
            <div>
                {loading && <p>loading...</p>}
                <div className=''>
                    {!loading &&
                        data &&
                        data.reviews.reviews.map((reviews) => (
                            <p>{reviews.movie_title}</p>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default withApollo({ ssr: true })(ReviewTab);

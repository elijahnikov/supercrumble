import { useReviewsQuery } from '@/generated/graphql';
import { getUsername } from '@/utils/getUsername';
import { withApollo } from '@/utils/withApollo'
import { useRouter } from 'next/router';

interface ReviewTabProps {}

const ReviewTab = ({}: ReviewTabProps) => {

    const username = getUsername();
    const router = useRouter();

    const {data, loading, error, fetchMore, variables} = useReviewsQuery({
        variables: {
            limit: 10,
            orderBy: "createdAt",
            
            cursor: null as null | string 
        }
    })

    return (
        
    )
}

export default withApollo({ssr: true})(ReviewTab);
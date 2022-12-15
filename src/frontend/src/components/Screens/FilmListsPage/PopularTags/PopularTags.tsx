// Router
import { useRouter } from 'next/router';

// GraphQL
import { useFilmListTagsQuery } from '@/generated/graphql';

interface PopularTagsProps {}

const PopularTags = ({}: PopularTagsProps) => {
    const router = useRouter();
    const { data, loading, error } = useFilmListTagsQuery({
        variables: {
            limit: 20,
            cursor: null as null | string,
        },
    });

    return (
        <div className=''>
            <div className='ml-2 h-[3vh] w-[68vw]'>
                <h4 className='float-left'>Popular Tags</h4>
            </div>
            <div className='clear-both ml-2 mt-2 text-left'>
                {data?.filmListTags.filmListTags.map((tag) => (
                    <div
                        key={tag.id}
                        className='mr-2 mt-2 inline-block rounded-md bg-gray-800 p-1'
                    >
                        <p className='text-xs text-gray-400'>{tag.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularTags;

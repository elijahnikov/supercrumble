// Router
import { useRouter } from 'next/router';

// GraphQL
import { useFilmListTagsQuery } from '@/generated/graphql';

interface PopularTagsProps {}

const PopularTags = ({}: PopularTagsProps) => {
    const router = useRouter();
    const { data, loading, error } = useFilmListTagsQuery({
        variables: {
            limit: 40,
            cursor: null as null | string,
        },
    });

    return (
        <div className=''>
            <div className='ml-2 h-[3vh]'>
                <h4 className='float-left'>Popular Tags</h4>
            </div>
            <div className='clear-both ml-2 mt-2 text-left'>
                {data?.filmListTags.filmListTags.map((tag) => (
                    <span
                        key={tag.id}
                        className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                    >
                        {tag.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PopularTags;

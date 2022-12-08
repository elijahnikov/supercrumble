interface TagsProps {
    tags: string;
}

const Tags = ({ tags }: TagsProps) => {
    return (
        <>
            {tags.split(',').map((tag: string, i: number) => (
                <div
                    key={i}
                    className='mr-2 inline-block rounded-md bg-gray-800 p-1'
                >
                    <p className='text-xs text-gray-400'>{tag}</p>
                </div>
            ))}
        </>
    );
};

export default Tags;

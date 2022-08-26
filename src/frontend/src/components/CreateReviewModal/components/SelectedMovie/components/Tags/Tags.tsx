import InputField from '@/components/Common/InputField/InputField';
import {
    ChangeEventHandler,
    Dispatch,
    KeyboardEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { BiX } from 'react-icons/bi';

interface TagsProps {
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags = ({ tags, setTags }: TagsProps) => {
    const [tag, setTag] = useState<string>('');
    // const [tags, setTags] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if (
                !tags.includes(event.target.value) &&
                tags.length < 4 &&
                event.target.value !== ''
            )
                setTags([...tags, event.target.value]);
            setTag('');
        }
    };

    useEffect(() => {
        if (tags.length >= 4) setDisabled(true);
        else setDisabled(false);
    }, [tags]);

    const handleTagChange = (event: any) => {
        if (event.target.value.length < 15) setTag(event.target.value);
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((item) => item !== tag));
    };

    return (
        <div className='w-[100%]'>
            <p className='mt-5 mb-2'>Tags</p>
            <div className='w-[250px]'>
                <InputField
                    value={tag}
                    name='tags'
                    disabled={disabled}
                    placeholder='tags (hit enter)'
                    type={'text'}
                    onKeyDown={handleKeyDown}
                    handleChange={(e: ChangeEventHandler<HTMLInputElement>) =>
                        handleTagChange(e)
                    }
                />
            </div>
            <div className='mt-5 w-[100%]'>
                {tags.length > 0 && (
                    <div>
                        {tags.map((tag, i) => (
                            <div
                                className='mr-4 inline cursor-pointer rounded-lg bg-crumble-200 p-2'
                                key={i}
                                onClick={() => removeTag(tag)}
                            >
                                <p className='inline text-xs'>{tag}</p>
                                <BiX className='ml-1 inline fill-superRed' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tags;

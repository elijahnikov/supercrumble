import { useRouter } from 'next/router';
import { BsFlag } from 'react-icons/bs';

interface TertiaryInfoProps {
    runtime: number;
    imdbLink: string;
    tmdbLink: string;
}

const TertiaryInfo = ({ runtime, imdbLink, tmdbLink }: TertiaryInfoProps) => {
    const router = useRouter();

    return (
        <div className='ml-3 mt-[20px] inline'>
            <div className='inline'>
                <p className='inline text-xs text-gray-400'>{runtime} mins</p>
            </div>
            <a
                target='_blank'
                href={`https://www.imdb.com/title/${imdbLink}`}
                className='ml-3 inline cursor-pointer rounded-sm border-[1px] border-gray-600 p-1 text-[9px] text-gray-300'
            >
                IMDB
            </a>
            <a
                target='_blank'
                href={`https://www.themoviedb.org/movie/${tmdbLink}`}
                className='ml-3 inline cursor-pointer rounded-sm border-[1px] border-gray-600 p-1 text-[9px] text-gray-300'
            >
                TMDB
            </a>
            <BsFlag className='ml-3 inline h-[15px] w-[15px] cursor-pointer fill-gray-400 hover:fill-gray-300' />
        </div>
    );
};

export default TertiaryInfo;

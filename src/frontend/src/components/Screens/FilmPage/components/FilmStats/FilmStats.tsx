import { FilmQuery } from '@/generated/graphql';
import { BsFillEyeFill, BsFillGridFill, BsFillHeartFill } from 'react-icons/bs';

interface FilmStatsProps {
    extraMovieData?: FilmQuery;
}

const FilmStats = ({ extraMovieData }: FilmStatsProps) => {
    return (
        <div className='ml-11 inline'>
            <p className='inline text-sm'>
                {extraMovieData && extraMovieData.film?.watchCount
                    ? extraMovieData?.film?.watchCount
                    : 0}
            </p>
            <BsFillEyeFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
            <p className='ml-3 inline text-sm'>
                {extraMovieData && extraMovieData.film?.listCount
                    ? extraMovieData.film.listCount
                    : 0}
            </p>
            <BsFillGridFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
            <p className='ml-3 inline text-sm'>
                {extraMovieData && extraMovieData.film?.likeCount
                    ? extraMovieData?.film?.likeCount
                    : 0}
            </p>
            <BsFillHeartFill className='ml-2 mt-[-2px] inline h-3 w-3 fill-superRed' />
        </div>
    );
};

export default FilmStats;

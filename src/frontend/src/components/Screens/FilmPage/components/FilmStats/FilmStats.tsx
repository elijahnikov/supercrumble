import { FilmQuery } from '@/generated/graphql';
import { kFormatter } from '@/utils/kFormatter';
import { BsFillEyeFill, BsFillGridFill, BsFillHeartFill } from 'react-icons/bs';

interface FilmStatsProps {
    extraMovieData?: FilmQuery;
}

const FilmStats = ({ extraMovieData }: FilmStatsProps) => {
    return (
        <div className='mt-8 w-[150px]'>
            <div className='float-left mb-3 w-[100%]'>
                <BsFillEyeFill className='float-left mt-[4px] mr-2 inline h-3 w-3 fill-superRed' />
                <p className='float-left  text-sm font-bold'>Views</p>
                <p className=' float-right ml-3  text-sm'>
                    {extraMovieData && extraMovieData.film?.watchCount
                        ? kFormatter(extraMovieData?.film?.watchCount)
                        : 0}
                </p>
            </div>
            <div className='float-left mb-3 w-[100%]'>
                <BsFillGridFill className='float-left mt-[4px] mr-2 inline h-3 w-3 fill-superRed' />
                <p className='float-left  text-sm font-bold'>Lists</p>
                <p className='float-right ml-3 inline text-sm'>
                    {extraMovieData && extraMovieData.film?.listCount
                        ? kFormatter(extraMovieData.film.listCount)
                        : 0}
                </p>
            </div>
            <div className='float-left mb-3 w-[100%]'>
                <BsFillHeartFill className='float-left mt-[4px] mr-2 inline h-3 w-3 fill-superRed' />
                <p className='float-left inline text-sm font-bold'>Likes</p>
                <p className='float-right ml-3 inline text-sm'>
                    {extraMovieData && extraMovieData.film?.likeCount
                        ? kFormatter(extraMovieData?.film?.likeCount)
                        : 0}
                </p>
            </div>
        </div>
    );
};

export default FilmStats;

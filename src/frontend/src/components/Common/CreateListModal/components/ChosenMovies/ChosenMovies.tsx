import { BsX } from 'react-icons/bs';

interface ChosenMoviesProps {
    chosenMovies: ChosenMovie[];
    handleRemoveMovie: (id: number) => void;
}

type ChosenMovie = {
    id: number;
    title: string;
    year: string;
    poster: string;
    backdrop: string;
    overview: string;
    releaseDate: string;
};

const ChosenMovies = ({
    chosenMovies,
    handleRemoveMovie,
}: ChosenMoviesProps) => {
    return (
        <div className=' ml-2'>
            {chosenMovies.map((movie) => (
                <div className='mt-1 inline-block w-[100%]' key={movie.id}>
                    {movie.poster ? (
                        <img
                            className='mt-1 inline w-10 rounded-md'
                            src={
                                movie.poster
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster}`
                                    : undefined
                            }
                        />
                    ) : (
                        <p>?</p>
                    )}
                    <p className='ml-4 inline'>{movie.title}</p>
                    <p className='ml-3 inline text-superRed'>
                        {movie.releaseDate.slice(0, 4)}
                    </p>
                    <div
                        className='float-right mt-7 w-[20px] cursor-pointer'
                        onClick={() => handleRemoveMovie(movie.id)}
                    >
                        <BsX className='h-[20px] w-[20px] text-superRed' />
                    </div>
                    <div className='mt-2 border-[0.5px] border-gray-800' />
                </div>
            ))}
        </div>
    );
};

export default ChosenMovies;

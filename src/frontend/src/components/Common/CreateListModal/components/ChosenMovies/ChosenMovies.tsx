import { BsX } from 'react-icons/bs';

interface ChosenMoviesProps {
    chosenMovies: ChosenMovie[];
    handleRemoveMovie: (id: number) => void;
}

type ChosenMovie = {
    movieId: number;
    movieTitle: string;
    posterPath: string;
    backdropPath: string;
    overview: string;
    releaseDate: string;
};
const ChosenMovies = ({
    chosenMovies,
    handleRemoveMovie,
}: ChosenMoviesProps) => {
    return (
        <div className='fixed ml-2 h-[250px] w-[85%] overflow-x-hidden rounded-lg bg-crumble-200 pb-6 pr-10 pl-10 pt-4'>
            {chosenMovies.map((movie) => (
                <div className='mt-1 inline-block w-[100%]' key={movie.movieId}>
                    {movie.posterPath ? (
                        <img
                            className='mt-1 inline w-10 rounded-md'
                            src={
                                movie.posterPath
                                    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                                    : undefined
                            }
                        />
                    ) : (
                        <p>?</p>
                    )}
                    <p className='ml-4 inline'>{movie.movieTitle}</p>
                    <p className='ml-3 inline text-sm text-superRed'>
                        {movie.releaseDate.slice(0, 4)}
                    </p>
                    <div
                        className='float-right mt-7 w-[20px] cursor-pointer'
                        onClick={() => handleRemoveMovie(movie.movieId)}
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

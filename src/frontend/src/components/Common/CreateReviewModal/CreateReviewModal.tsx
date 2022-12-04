import {
    useCreateFilmMutation,
    useCreateReviewMutation,
} from '@/generated/graphql';
import { isAuthHook } from '@/utils/isAuthHook';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsFillXCircleFill, BsPlusSquare } from 'react-icons/bs';
import { Dialog, Transition } from '@headlessui/react';
import InputField from '../InputField/InputField';
import InputArea from '../InputArea/InputArea';
import { Rating } from 'react-simple-star-rating';
import MovieResults from './components/MovieResults/MovieResults';
import SelectedMovie from './components/SelectedMovie/SelectedMovie';
import Button from '../Button/Button';

interface CreateReviewModalProps {
    film?: {
        id: number;
        originalTitle: string;
        releaseDate: string;
        posterPath: string;
        overview: string;
        backdropPath: string;
        show: boolean;
    };
    buttonTitle?: string;
}

const CreateReviewModal = ({ film, buttonTitle }: CreateReviewModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const cancelButtonRef = useRef(null);

    const router = useRouter();
    isAuthHook();

    const [movieName, setMovieName] = useState('');
    const [chosenMovieDetails, setChosenMovieDetails] = useState({
        movieId: 0,
        movieTitle: '',
        year: '',
        posterPath: '',
        backdropPath: '',
        overview: '',
        releaseDate: '',
    });
    const [reviewText, setReviewText] = useState('');
    const [debounceTime, setDebounceTime] = useState(500);
    const [movieFetchData, setMovieFetchData] = useState<any[]>([]);
    const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);
    const [blockInput, setBlockInput] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [spoilerChecked, setSpoilerChecked] = useState(false);

    const [createReview] = useCreateReviewMutation();
    const [createFilm] = useCreateFilmMutation();

    const handleOpen = () => {
        setOpen(!open);
        if (film) {
            handleMovieClick(
                film.id,
                film.originalTitle,
                film.releaseDate,
                film.posterPath,
                film.overview,
                film.backdropPath,
                film.releaseDate,
                true
            );
            setDebounceTime(0);
        } else {
            setDebounceTime(500);
        }
    };

    const searchMovie = async () => {
        if (movieName) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${movieName}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setMovieFetchData(data.results);
        } else {
            setMovieFetchData([]);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchMovie();
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [movieName]);

    const handleRating = (rate: any) => {
        setRatingValue(rate);
    };

    const handleSpoiler = () => {
        setSpoilerChecked(!spoilerChecked);
    };

    const handleCreateReview = async () => {
        setLoading(true);
        const filmResponse = await createFilm({
            variables: {
                input: {
                    movieId: chosenMovieDetails.movieId,
                    movieTitle: chosenMovieDetails.movieTitle,
                    overview: chosenMovieDetails.overview,
                    posterPath: chosenMovieDetails.posterPath,
                    backdropPath: chosenMovieDetails.backdropPath,
                    releaseDate: chosenMovieDetails.releaseDate,
                },
            },
        });
        const response = await createReview({
            variables: {
                input: {
                    tags: tags.join(','),
                    containsSpoilers: spoilerChecked,
                    movieId: chosenMovieDetails.movieId,
                    movie_poster: chosenMovieDetails.posterPath,
                    backdrop: chosenMovieDetails.backdropPath,
                    movie_release_year: parseInt(chosenMovieDetails.year),
                    movie_title: chosenMovieDetails.movieTitle,
                    ratingGiven: ratingValue / 20,
                    text: reviewText,
                },
            },
        });
        if (filmResponse.errors) {
            console.log(filmResponse.errors);
        }
        setLoading(false);
        router.push(`/review/${response.data?.createReview.referenceId}`);
    };

    const handleMovieNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMovieName(event.target.value);
    };

    const handleCancelClick = (show: boolean) => {
        setChosenMovieDetails({
            movieId: 0,
            movieTitle: '',
            year: '',
            posterPath: '',
            backdropPath: '',
            overview: '',
            releaseDate: '',
        });
        setBlockInput(show);
        setSelectedMovieVisible(false);
        setMovieName('');
    };

    const handleMovieClick = (
        movieId: number,
        movieTitle: string,
        movieYear: string,
        moviePoster: string,
        movieOverview: string,
        movieBackdrop: string,
        movieReleaseDate: string,
        show: boolean
    ) => {
        setBlockInput(show);
        setMovieFetchData([]);
        setChosenMovieDetails({
            movieId: movieId,
            movieTitle: movieTitle,
            year: movieYear,
            posterPath: moviePoster,
            overview: movieOverview,
            backdropPath: movieBackdrop,
            releaseDate: movieReleaseDate,
        });
        setMovieName('');
        setSelectedMovieVisible(true);
    };

    return (
        <>
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className=''
                // onClick={() => setOpen(!open)}
            >
                {buttonTitle ? (
                    <Button onClick={() => handleOpen()}>{buttonTitle}</Button>
                ) : (
                    <Button onClick={() => handleOpen()}>
                        Add
                        <BsPlusSquare className='mx-auto ml-1 inline h-4 w-4 fill-white dark:fill-black  navBar:hover:fill-white' />
                    </Button>
                )}
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-20'
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity' />
                    </Transition.Child>
                    <div className=' fixed inset-0 z-10 '>
                        <div className=' flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel
                                    className='
                                        relative
                                        transform
                                        
                                        rounded-lg
                                        bg-crumble-100
                                        text-left
                                        text-white
                                        shadow-xl
                                        transition-all
                                        sm:my-10
                                        sm:w-full
                                        sm:max-w-2xl
                                    '
                                >
                                    <div className=' bg-crumble-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <div className='mb-10 sm:flex sm:items-start'>
                                            <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>
                                                <Dialog.Title
                                                    as='h3'
                                                    className='text-lg font-medium leading-6 text-superRed'
                                                >
                                                    Create a review
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <div className='w-full md:flex'>
                                                        <div className='w-full p-8'>
                                                            {!blockInput ? (
                                                                <div className='w-full'>
                                                                    <p className='float-left mb-2 text-sm font-semibold text-superRed'>
                                                                        Search
                                                                        for a
                                                                        film
                                                                    </p>
                                                                    <div>
                                                                        <InputField
                                                                            autoFocus
                                                                            value={
                                                                                movieName
                                                                            }
                                                                            id='movieInput'
                                                                            className='w-[100%] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
                                                                            name='searchFilms'
                                                                            placeholder='search film...'
                                                                            handleChange={(
                                                                                e: React.ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                handleMovieNameChange(
                                                                                    e
                                                                                )
                                                                            }
                                                                            type='text'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            <>
                                                                <MovieResults
                                                                    handleMovieClick={
                                                                        handleMovieClick
                                                                    }
                                                                    movieFetchData={
                                                                        movieFetchData
                                                                    }
                                                                />
                                                                <SelectedMovie
                                                                    selectedMovieVisible={
                                                                        selectedMovieVisible
                                                                    }
                                                                    chosenMovieDetails={
                                                                        chosenMovieDetails
                                                                    }
                                                                    handleCancelClick={
                                                                        handleCancelClick
                                                                    }
                                                                    reviewText={
                                                                        reviewText
                                                                    }
                                                                    setReviewText={
                                                                        setReviewText
                                                                    }
                                                                    handleRating={
                                                                        handleRating
                                                                    }
                                                                    ratingValue={
                                                                        ratingValue
                                                                    }
                                                                    spoilerChecked={
                                                                        spoilerChecked
                                                                    }
                                                                    handleSpoiler={
                                                                        handleSpoiler
                                                                    }
                                                                    setRatingValue={
                                                                        setRatingValue
                                                                    }
                                                                    tags={tags}
                                                                    setTags={
                                                                        setTags
                                                                    }
                                                                />
                                                            </>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-crumble-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                        <button
                                            type='button'
                                            className='handleCreateReview'
                                            onClick={handleCreateReview}
                                        >
                                            Post
                                        </button>
                                        <button
                                            type='button'
                                            className='cancelCreateReview'
                                            onClick={() => {
                                                setOpen(false),
                                                    handleCancelClick(false);
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default CreateReviewModal;

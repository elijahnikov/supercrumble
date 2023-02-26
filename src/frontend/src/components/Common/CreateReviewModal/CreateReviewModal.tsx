import {
    useCreateDiaryMutation,
    useCreateFilmMutation,
    useCreateReviewMutation,
    useCreateWatchedMutation,
    useMeQuery,
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
import { BiCommentDetail } from 'react-icons/bi';
import { createTimestamp } from '@/utils/createTimestamp';

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
    fromMenu?: boolean;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const CreateReviewModal = ({
    open,
    setOpen,
    film,
    fromMenu,
}: CreateReviewModalProps) => {
    // const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const cancelButtonRef = useRef(null);

    const router = useRouter();
    const { data: meData } = useMeQuery();

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
    const [watchedOnChecked, setWatchedOnCheck] = useState(true);
    const [watchedOnDate, setWatchedOnDate] = useState(new Date());
    const [rewatchChecked, setRewatchChecked] = useState(false);
    const [reviewStarted, setReviewStarted] = useState(false);

    const [createReview] = useCreateReviewMutation();
    const [createFilm] = useCreateFilmMutation();
    const [createWatched] = useCreateWatchedMutation();
    const [createDiary] = useCreateDiaryMutation();

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

    useEffect(() => {
        if (reviewText !== '') setReviewStarted(true);
        else setReviewStarted(false);
    }, [reviewText]);

    const handleRating = (rate: any) => {
        setRatingValue(rate);
    };

    const handleCreateReview = async () => {
        let reviewResponse = null;
        setLoading(true);
        await createFilm({
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
        const watched = await createWatched({
            variables: {
                input: {
                    ratingGiven: ratingValue,
                    filmId: chosenMovieDetails.movieId,
                    filmTitle: chosenMovieDetails.movieTitle,
                    posterPath: chosenMovieDetails.posterPath,
                },
            },
        });
        if (reviewText) {
            reviewResponse = await createReview({
                variables: {
                    input: {
                        tags: tags.join(','),
                        containsSpoilers: spoilerChecked,
                        watchedOn: watchedOnDate.toLocaleDateString(),
                        movieId: chosenMovieDetails.movieId,
                        movie_poster: chosenMovieDetails.posterPath,
                        backdrop: chosenMovieDetails.backdropPath,
                        movie_release_year: parseInt(chosenMovieDetails.year),
                        movie_title: chosenMovieDetails.movieTitle,
                        ratingGiven: ratingValue,
                        text: reviewText,
                    },
                },
            });
        }
        if (watchedOnChecked) {
            const diaryResponse = await createDiary({
                variables: {
                    input: {
                        filmId: chosenMovieDetails.movieId,
                        filmTitle: chosenMovieDetails.movieTitle,
                        posterPath: chosenMovieDetails.posterPath,
                        ratingGiven: ratingValue,
                        reviewLink: reviewResponse?.data
                            ? `/review/${reviewResponse?.data?.createReview.referenceId}`
                            : null,
                        rewatch: rewatchChecked,
                        watchedOn: createTimestamp(watchedOnDate),
                    },
                },
            });
        }
        if (reviewText) {
            router.push(
                `/review/${reviewResponse?.data?.createReview.referenceId}`
            );
            setOpen(!open);
        } else {
            router.push(`/@${meData?.me?.username}/films`);
            setOpen(!open);
        }
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
            <div>
                {!fromMenu && (
                    <Button className='mt-8' onClick={() => handleOpen()}>
                        Create a review
                    </Button>
                )}
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-40'
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
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
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
                                    className={`
                                        ${
                                            blockInput
                                                ? 'smallerPageFrame'
                                                : 'w-[35%]'
                                        }
                                        relative
                                        transform
                                        rounded-lg
                                        bg-crumble-100
                                        text-left
                                        text-white
                                        shadow-xl
                                        transition-all
                                    `}
                                >
                                    <div className=' bg-crumble-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <div className='sm:flex sm:items-start'>
                                            <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>
                                                <Dialog.Title
                                                    as='h3'
                                                    className='text-lg font-medium leading-6 text-superRed'
                                                >
                                                    Add to your films
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
                                                                            onChange={(
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
                                                                    handleSpoiler={() =>
                                                                        setSpoilerChecked(
                                                                            !spoilerChecked
                                                                        )
                                                                    }
                                                                    setRatingValue={
                                                                        setRatingValue
                                                                    }
                                                                    tags={tags}
                                                                    setTags={
                                                                        setTags
                                                                    }
                                                                    watchedOnChecked={
                                                                        watchedOnChecked
                                                                    }
                                                                    handleWatchedOnCheck={() =>
                                                                        setWatchedOnCheck(
                                                                            !watchedOnChecked
                                                                        )
                                                                    }
                                                                    rewatchChecked={
                                                                        rewatchChecked
                                                                    }
                                                                    handleRewatchChecked={() =>
                                                                        setRewatchChecked(
                                                                            !rewatchChecked
                                                                        )
                                                                    }
                                                                    reviewStarted={
                                                                        reviewStarted
                                                                    }
                                                                    watchedOnDate={
                                                                        watchedOnDate
                                                                    }
                                                                    setWatchedOnDate={
                                                                        setWatchedOnDate
                                                                    }
                                                                />
                                                            </>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {blockInput ? (
                                        <div className='bg-crumble-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                            <button
                                                type='button'
                                                className='handleCreateReview'
                                                onClick={handleCreateReview}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type='button'
                                                className='cancelCreateReview'
                                                onClick={() => {
                                                    setOpen(false),
                                                        handleCancelClick(
                                                            false
                                                        );
                                                }}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : null}
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

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
import Button from '../Button/Button';
import Tags from './components/Tags/Tags';
import MovieResults from './components/MovieResults/MovieResults';

interface CreateListModalProps {}

type ChosenMovie = {
    id: number;
    title: string;
    year: string;
    poster: string;
    backdrop: string;
    overview: string;
    releaseDate: string;
};

const CreateListModal = ({}: CreateListModalProps) => {
    const [listName, setListName] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [debounceTime, setDebounceTime] = useState(500);
    const [tags, setTags] = useState<string[]>([]);
    const cancelButtonRef = useRef(null);

    const router = useRouter();
    isAuthHook();

    const [movieName, setMovieName] = useState('');
    const [chosenMovies, setChosenMovies] = useState<ChosenMovie[]>([]);
    const [movieFetchData, setMovieFetchData] = useState<any[]>([]);
    const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);

    const [createFilm] = useCreateFilmMutation();

    const handleOpen = () => {
        setOpen(!open);
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

    const handleMovieNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDebounceTime(500);
        setMovieName(event.target.value);
    };

    const handleCancelClick = (show: boolean) => {};

    const addMovie = (
        movieId: number,
        movieTitle: string,
        movieYear: string,
        moviePoster: string,
        movieOverview: string,
        movieBackdrop: string,
        movieReleaseDate: string,
        show: boolean
    ) => {
        let duplicateCheck = chosenMovies.find((movie) => {
            return movie.id === movieId;
        });
        if (!duplicateCheck) {
            setChosenMovies([
                ...chosenMovies,
                {
                    id: movieId,
                    title: movieTitle,
                    year: movieYear,
                    poster: moviePoster,
                    overview: movieOverview,
                    backdrop: movieBackdrop,
                    releaseDate: movieReleaseDate,
                },
            ]);
        }
        setMovieName('');
        setDebounceTime(0);
    };

    const removeMovie = (id: number) => {
        setChosenMovies(chosenMovies.filter((movie) => movie.id !== id));
    };

    const createList = async () => {
        if (chosenMovies.length > 0) {
            let response;
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchMovie();
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [movieName]);

    useEffect(() => {
        console.log(chosenMovies);
    }, [chosenMovies]);

    return (
        <>
            <div
                className=''
                // onClick={() => setOpen(!open)}
            >
                <Button className='mt-8' onClick={() => handleOpen()}>
                    Create a new list
                </Button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='overflow-y-initial  relative z-20'
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
                    <div className='fixed inset-0 z-10 '>
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
                                    className='
                                        absolute

                                        h-[80vh]
                                        transform
                                        overflow-y-auto
                                        rounded-lg
                                        bg-crumble-100
                                        text-left
                                        text-white
                                        shadow-xl
                                        transition-all
                                        sm:my-10
                                        sm:w-full
                                        sm:max-w-4xl
                                    '
                                >
                                    <div className=' bg-crumble-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <div className='mb-10 sm:flex sm:items-start'>
                                            <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>
                                                <Dialog.Title
                                                    as='h3'
                                                    className='text-lg font-medium leading-6 text-superRed'
                                                >
                                                    Create a new list
                                                    <div className='float-right'>
                                                        <button
                                                            type='button'
                                                            className='handleCreateReview'
                                                            onClick={() =>
                                                                createList()
                                                            }
                                                        >
                                                            Create
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
                                                            ref={
                                                                cancelButtonRef
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <div className='w-full md:flex'>
                                                        <div className='w-full p-8'>
                                                            <div className='float-left w-[50%] '>
                                                                <p className='mb-2 text-sm font-semibold text-superRed'>
                                                                    Name of list
                                                                </p>
                                                                <div>
                                                                    <InputField
                                                                        autoFocus
                                                                        value={
                                                                            listName
                                                                        }
                                                                        id='listName'
                                                                        className='w-[350px] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
                                                                        name='listName'
                                                                        placeholder=''
                                                                        handleChange={(
                                                                            e: React.ChangeEvent<HTMLInputElement>
                                                                        ) =>
                                                                            setListName(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type='text'
                                                                    />
                                                                </div>
                                                                <Tags
                                                                    setTags={
                                                                        setTags
                                                                    }
                                                                    tags={tags}
                                                                />
                                                            </div>
                                                            <div className='float-right w-[50%]'>
                                                                <div className='h-[153px] w-[350px]'>
                                                                    <p className='mb-2 text-sm font-semibold text-superRed'>
                                                                        Description
                                                                    </p>
                                                                    <InputArea />
                                                                </div>
                                                            </div>

                                                            <>
                                                                {/*<SelectedMovie
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
                                                                /> */}
                                                            </>
                                                        </div>
                                                    </div>
                                                    <div className='ml-8 pr-8'>
                                                        <p className='mb-2 text-sm font-semibold text-superRed'>
                                                            Add a film
                                                        </p>
                                                        <InputField
                                                            autoFocus
                                                            value={movieName}
                                                            id='movieInput'
                                                            className='w-[350px] rounded border-gray-800 bg-crumble-200 py-2 px-3 text-white'
                                                            name='searchFilms'
                                                            placeholder=''
                                                            handleChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>
                                                            ) =>
                                                                handleMovieNameChange(
                                                                    e
                                                                )
                                                            }
                                                            type='text'
                                                        />
                                                        {chosenMovies &&
                                                            chosenMovies.map(
                                                                (movie) => (
                                                                    <div
                                                                        key={
                                                                            movie.id
                                                                        }
                                                                    >
                                                                        <p
                                                                            onClick={() =>
                                                                                removeMovie(
                                                                                    movie.id
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                movie.title
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            )}
                                                        <MovieResults
                                                            handleMovieClick={
                                                                addMovie
                                                            }
                                                            movieFetchData={
                                                                movieFetchData
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default CreateListModal;

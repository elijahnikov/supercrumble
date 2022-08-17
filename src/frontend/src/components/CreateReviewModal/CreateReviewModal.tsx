import { useCreateReviewMutation } from "@/generated/graphql";
import { isAuthHook } from "@/utils/isAuthHook";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsFillXCircleFill, BsPlusSquare } from "react-icons/bs";
import {Dialog, Transition} from '@headlessui/react'
import InputField from "../Common/InputField/InputField";
import InputArea from "../Common/InputArea/InputArea";
import {Rating} from 'react-simple-star-rating';

interface CreateReviewModalProps {

}

const CreateReviewModal = ({}: CreateReviewModalProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const cancelButtonRef = useRef(null);

    const router = useRouter();
    isAuthHook()

    const [movieName, setMovieName] = useState("");
    const [chosenMovieDetails, setChosenMovieDetails] = useState({
        id: 0,
        title: "",
        year: "",
        poster: ""
    })
    const [reviewText, setReviewText] = useState("");
    const [movieFetchData, setMovieFetchData] = useState<any[]>([]);
    const [selectedMovieVisible, setSelectedMovieVisible] = useState(false);
    const [blockInput, setBlockInput] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [spoilerChecked, setSpoilerChecked] = useState(false);

    const [createReview] = useCreateReviewMutation();

    const searchMovie = async () => {
        if (movieName) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=062b67bca7a1dbc477fd28d5b6a7eb99&query=${movieName}`
            const response = await fetch(url);
            const data = await response.json();
            setMovieFetchData(data.results)
        } else {
            setMovieFetchData([])
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchMovie()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [movieName])

    const handleRating = (rate: any) => {
        setRatingValue(rate)
    }
    
    const handleSpoiler = () => {
        setSpoilerChecked(!spoilerChecked)
    }

    const handleCreateReview = async () => {
        setLoading(true);
        const response = await createReview({variables: {input: {
            containsSpoilers: spoilerChecked,
            movieId: chosenMovieDetails.id,
            movie_poster: chosenMovieDetails.poster,
            movie_release_year: parseInt(chosenMovieDetails.year),
            movie_title: chosenMovieDetails.title,
            ratingGiven: ratingValue / 20,
            text: reviewText
        }}})
        setLoading(false);
        router.push(`/review/${response.data?.createReview.referenceId}`)
    }

    const handleChange = (event: any) => {
        setMovieName(event.target.value)
    }

    const handleCancelClick = (show: boolean) => {
        setChosenMovieDetails({
            id: 0,
            title: "",
            year: "",
            poster: ""
        })
        setBlockInput(show);
        setSelectedMovieVisible(false)
        setMovieName("")
    }

    const handleMovieClick = (
        movieId: number,
        movieTitle: string,
        movieYear: string,
        moviePoster: string,
        show: boolean
    ) => {
        setBlockInput(show);
        setMovieFetchData([])
        setChosenMovieDetails({
            id: movieId,
            title: movieTitle,
            year: movieYear,
            poster: moviePoster
        })
        setMovieName("")
        setSelectedMovieVisible(true)
    }

    return (
        <>
            <div 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="navBar-create-review-container" 
                onClick={() => setOpen(!open)}
            >
                <div className="navBar-create-review-icon-container">
                    <BsPlusSquare className="h-8 w-8 ml-[-1px] fill-white dark:fill-black navBar:h-5 navBar:w-5 navBar:hover:fill-white"/>
                </div>
                {showTooltip && (
                    <div className='absolute left-[120px] mb-[30px] text-sm bg-crumble-100 p-2 rounded-md'>
                        Create Review
                    </div>  
                )}   
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"                            
                            >
                                <Dialog.Panel
                                    className="
                                        relative
                                        text-white
                                        bg-crumble-100
                                        rounded-lg
                                        text-left
                                        overflow-hidden
                                        shadow-xl
                                        transform
                                        transition-all
                                        sm:my-10
                                        sm:max-w-2xl
                                        sm:w-full
                                    "
                                >
                                    <div className="bg-crumble-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start mb-10">
                                            <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-superRed">
                                                    Create a review
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <div className="md:flex w-full">
                                                        <div className="p-8 w-full">
                                                            {!blockInput ? 
                                                                <div className="w-full">
                                                                    <p className="text-sm text-superRed font-semibold float-left mb-2">Search for a film</p>
                                                                    <div>
                                                                        <InputField
                                                                            value={movieName}
                                                                            id="movieInput"
                                                                            className="w-[100%] rounded border-gray-800 bg-crumble-100 py-2 px-3 text-white"
                                                                            name="searchFilms"
                                                                            placeholder="search film..."
                                                                            onChangeHandler={handleChange}
                                                                            type="text"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            : null}
                                                            <>
                                                                <div className="grid grid-cols-4 gap-2 mt-5">
                                                                    {movieFetchData ? movieFetchData.slice(0, 6).map((m) => m.length === 0 ? <div>Nothing found :/</div> : (
                                                                        <div
                                                                            onClick={() => handleMovieClick(m.id, m.original_title, m.release_date, m.poster_path, true)}
                                                                            key={m.id}
                                                                            className="mb-2 border-[1px] border-gray-800 rounded-md p-2 cursor-pointer hover:bg-crumble-100"
                                                                        >
                                                                            {m.poster_path ? <img className="rounded-md" src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : undefined}/> : <p>?</p>}
                                                                            <div className="text-left mt-2">
                                                                                <p className="text-sm inline">{m.original_title.length > 50 ? m.original_title.slice(0, 50) + '...' : m.original_title}{" "}</p>
                                                                                <p className="text-superRed inline text-xs">{m.release_date ? m.release_date.substring(0, 4) : null}</p>
                                                                            </div>
                                                                        </div>
                                                                    )) : null}
                                                                </div>
                                                                {selectedMovieVisible && 
                                                                    <div>
                                                                        <div className="p-10 flex">
                                                                            <img className="rounded-md aspet-auto h-[200px]" src={chosenMovieDetails.poster ? `https://image.tmdb.org/t/p/w500${chosenMovieDetails.poster}` : undefined}/>
                                                                            <div className="text-left ml-5">
                                                                                <h2 className="text-white">{chosenMovieDetails.title}</h2>
                                                                                <h3 className="text-superRed">{chosenMovieDetails.year.slice(0, 4)}</h3>
                                                                            </div>
                                                                            <BsFillXCircleFill onClick={() => handleCancelClick(false)} className='cursor-pointer float-right mt-[8px] ml-2 h-6 w-6'/>
                                                                        </div>
                                                                        <div>
                                                                            <div>
                                                                                <InputArea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your thoughts"/>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <p className="mt-5">Rating</p>
                                                                        </div>
                                                                        <div className="w-[140px]">
                                                                            <div className="inline">
                                                                                <Rating allowHalfIcon={true} initialValue={0} size={20} fillColor={'#FD4443'} onClick={handleRating} ratingValue={ratingValue}/>
                                                                            </div>
                                                                            {ratingValue > 0 ? (
                                                                                <BsFillXCircleFill onClick={() => setRatingValue(0)} className="cursor-pointer float-right mt-[5px] ml-2 h-5 w-5"/>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="mt-5">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=""
                                                                                checked={spoilerChecked}
                                                                                onChange={handleSpoiler}
                                                                                id="flexCheckDefault"
                                                                                className="
                                                                                    spoilerCheckbox form-check-input
                                                                                "
                                                                            />
                                                                            <label className="form-check-label inline-block" htmlFor="flexRadioDefault1">
                                                                                Contains spoilers
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-crumble-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="handleCreateReview"
                                            onClick={handleCreateReview}
                                        >
                                            Post
                                        </button>
                                        <button
                                            type="button"
                                            className="cancelCreateReview"
                                            onClick={() => {setOpen(false), handleCancelClick(false)}}
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
    )
}

export default CreateReviewModal;
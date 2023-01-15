import Button from '@/components/Common/Button/Button';
import InputArea from '@/components/Common/InputArea/InputArea';
import {
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { BsArrowLeft, BsFillXCircleFill } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';
import Tags from './components/Tags/Tags';
import DatePicker from 'react-datepicker';

type ChosenMovieDetailsType = {
    movieId: number;
    movieTitle: string;
    year: string;
    posterPath: string;
    backdropPath: string;
    overview: string;
    releaseDate: string;
};

interface SelectedMovieProps {
    selectedMovieVisible: boolean;
    chosenMovieDetails: ChosenMovieDetailsType;
    handleCancelClick: Function;
    reviewText: string;
    setReviewText: (value: SetStateAction<string>) => void;
    handleRating: (rate: any) => void;
    ratingValue: number;
    spoilerChecked: boolean;
    handleSpoiler: ChangeEventHandler<HTMLInputElement>;
    setRatingValue: (value: SetStateAction<number>) => void;
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
    watchedOnChecked: boolean;
    handleWatchedOnCheck: ChangeEventHandler<HTMLInputElement>;
    rewatchChecked: boolean;
    handleRewatchChecked: ChangeEventHandler<HTMLInputElement>;
    reviewStarted: boolean;
    watchedOnDate: Date;
    setWatchedOnDate: Dispatch<SetStateAction<Date>>;
}

const SelectedMovie = ({
    selectedMovieVisible,
    chosenMovieDetails,
    handleCancelClick,
    reviewText,
    setReviewText,
    handleRating,
    ratingValue,
    spoilerChecked,
    handleSpoiler,
    setRatingValue,
    tags,
    setTags,
    watchedOnChecked,
    handleWatchedOnCheck,
    rewatchChecked,
    handleRewatchChecked,
    reviewStarted,
    watchedOnDate,
    setWatchedOnDate,
}: SelectedMovieProps) => {
    const [addToDiary, setAddToDiary] = useState(false);

    const handleDateChange = (newValue: any) => {
        setWatchedOnDate(newValue);
    };
    useEffect(() => {
        setAddToDiary(watchedOnChecked);
    }, [watchedOnChecked]);

    return (
        <>
            {selectedMovieVisible && (
                <div>
                    <Button
                        className='ml-10'
                        variant='secondary'
                        onClick={() => handleCancelClick(false)}
                    >
                        <BsArrowLeft className='mr-1' />
                        Back
                    </Button>
                    <div className='flex p-10'>
                        <img
                            className='aspect-auto h-[200px] rounded-md'
                            src={
                                chosenMovieDetails.posterPath
                                    ? `https://image.tmdb.org/t/p/w500${chosenMovieDetails.posterPath}`
                                    : undefined
                            }
                        />
                        <div className='ml-5 inline w-[100%] text-left'>
                            <div className='mb-5'>
                                <h2 className='inline text-white'>
                                    {chosenMovieDetails.movieTitle}
                                </h2>
                                <h3 className='ml-2 inline text-superRed'>
                                    {chosenMovieDetails.year.slice(0, 4)}
                                </h3>
                            </div>
                            {watchedOnChecked ? (
                                <div className='flex w-[550px]'>
                                    <div className='flex w-[300px] '>
                                        <input
                                            type='checkbox'
                                            value=''
                                            checked={watchedOnChecked}
                                            onChange={handleWatchedOnCheck}
                                            id='flexCheckDefault'
                                            className='spoilerCheckbox form-check-input float-left inline'
                                        />
                                        <p className='w-[150px]'>Watched on</p>
                                        <DatePicker
                                            className='ml-3 mt-[-10px] inline w-[110px] rounded-md border-none bg-crumble-100'
                                            selected={watchedOnDate}
                                            dateFormat='dd/MM/yyyy'
                                            onChange={(date: Date) =>
                                                setWatchedOnDate(date)
                                            }
                                        />
                                    </div>
                                    <div className='ml-[-20px] inline w-[250px]'>
                                        <input
                                            type='checkbox'
                                            value=''
                                            checked={rewatchChecked}
                                            onChange={handleRewatchChecked}
                                            id='flexCheckDefault'
                                            className='spoilerCheckbox form-check-input'
                                        />
                                        <p>I've watched this film before</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex w-[400px]'>
                                    <div className='inline w-[200px]'>
                                        <input
                                            type='checkbox'
                                            value=''
                                            checked={addToDiary}
                                            onChange={(e: any) => {
                                                setAddToDiary(!addToDiary);
                                                handleWatchedOnCheck(
                                                    e.target.value
                                                );
                                            }}
                                            id='flexCheckDefault'
                                            className='spoilerCheckbox form-check-input'
                                        />
                                        <p>Add film to diary?</p>
                                    </div>
                                </div>
                            )}
                            <div className='mt-5 h-[200px]'>
                                <InputArea
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                    placeholder='Write your thoughts'
                                />
                            </div>
                            <div className='flex w-[100%]'>
                                <div className='mr-10 inline'>
                                    <Tags
                                        reviewStarted={reviewStarted}
                                        tags={tags}
                                        setTags={setTags}
                                    />
                                </div>
                                <div className='inline'>
                                    <div>
                                        <p className='mt-5'>Rating</p>
                                    </div>
                                    <div className='mt-3 w-[160px]'>
                                        <div className='inline'>
                                            <Rating
                                                allowHalfIcon={true}
                                                initialValue={0}
                                                size={25}
                                                fillColor={'#FD4443'}
                                                onClick={handleRating}
                                                ratingValue={ratingValue}
                                            />
                                        </div>
                                        {ratingValue > 0 ? (
                                            <BsFillXCircleFill
                                                onClick={() =>
                                                    setRatingValue(0)
                                                }
                                                className='float-right mt-[5px] ml-2 h-5 w-5 cursor-pointer'
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='mt-5'>
                                    <input
                                        disabled={!reviewStarted}
                                        type='checkbox'
                                        value=''
                                        checked={spoilerChecked}
                                        onChange={handleSpoiler}
                                        id='flexCheckDefault'
                                        className='spoilerCheckbox form-check-input'
                                    />
                                    <label
                                        className='form-check-label inline-block'
                                        htmlFor='flexRadioDefault1'
                                    >
                                        Contains spoilers
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SelectedMovie;

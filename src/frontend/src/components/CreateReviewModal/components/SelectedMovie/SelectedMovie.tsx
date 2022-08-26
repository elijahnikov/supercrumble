import InputArea from '@/components/Common/InputArea/InputArea';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';
import Tags from './components/Tags/Tags';

type ChosenMovieDetailsType = {
    id: number;
    title: string;
    year: string;
    poster: string;
    backdrop: string;
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
}: SelectedMovieProps) => {
    return (
        <>
            {selectedMovieVisible && (
                <div>
                    <div className='flex p-10'>
                        <img
                            className='aspet-auto h-[200px] rounded-md'
                            src={
                                chosenMovieDetails.poster
                                    ? `https://image.tmdb.org/t/p/w500${chosenMovieDetails.poster}`
                                    : undefined
                            }
                        />
                        <div className='ml-5 text-left'>
                            <h2 className='text-white'>
                                {chosenMovieDetails.title}
                            </h2>
                            <h3 className='text-superRed'>
                                {chosenMovieDetails.year.slice(0, 4)}
                            </h3>
                        </div>
                        <BsFillXCircleFill
                            onClick={() => handleCancelClick(false)}
                            className='float-right mt-[8px] ml-2 h-6 w-6 cursor-pointer'
                        />
                    </div>
                    <div>
                        <div>
                            <InputArea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder='Write your thoughts'
                            />
                        </div>
                    </div>
                    <div>
                        <p className='mt-5'>Rating</p>
                    </div>
                    <div className='w-[140px]'>
                        <div className='inline'>
                            <Rating
                                allowHalfIcon={true}
                                initialValue={0}
                                size={20}
                                fillColor={'#FD4443'}
                                onClick={handleRating}
                                ratingValue={ratingValue}
                            />
                        </div>
                        {ratingValue > 0 ? (
                            <BsFillXCircleFill
                                onClick={() => setRatingValue(0)}
                                className='float-right mt-[5px] ml-2 h-5 w-5 cursor-pointer'
                            />
                        ) : null}
                    </div>
                    <div className='mt-5'>
                        <input
                            type='checkbox'
                            value=''
                            checked={spoilerChecked}
                            onChange={handleSpoiler}
                            id='flexCheckDefault'
                            className='
                                                                                    spoilerCheckbox form-check-input
                                                                                '
                        />
                        <label
                            className='form-check-label inline-block'
                            htmlFor='flexRadioDefault1'
                        >
                            Contains spoilers
                        </label>
                    </div>
                    <Tags tags={tags} setTags={setTags} />
                </div>
            )}
        </>
    );
};

export default SelectedMovie;

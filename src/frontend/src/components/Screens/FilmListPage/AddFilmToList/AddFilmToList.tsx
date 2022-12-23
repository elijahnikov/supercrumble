import { useEffect, useState } from 'react';

// Components
import InputField from '@/components/Common/InputField/InputField';
import Results from './Results/Results';
import {
    FilmListDocument,
    useAddEntryToFilmListMutation,
} from '@/generated/graphql';

interface AddFilmToListProps {
    listId: string;
}

const AddFilmToList = ({ listId }: AddFilmToListProps) => {
    const [searchText, setSearchText] = useState('');
    const [movieFetchData, setMovieFetchData] = useState<any[]>([]);
    const [debounceTime, setDebounceTime] = useState(500);

    const [addEntryToFilmList] = useAddEntryToFilmListMutation();

    const searchMovie = async () => {
        if (searchText) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchText}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setMovieFetchData(data.results);
        } else {
            setMovieFetchData([]);
        }
    };

    const handleMovieClick = async (filmId: number) => {
        addEntryToFilmList({
            variables: {
                listId: listId,
                filmId: filmId,
            },
        });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchMovie();
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    return (
        <div className='mt-10 mb-[-20px]'>
            {/* <Button>Add</Button> */}
            <InputField
                name='searchText'
                placeholder='Search to add a film to the list...'
                onChange={(e: any) => setSearchText(e.target.value)}
                value={searchText}
                type={'text'}
            />
            <Results
                movieFetchData={movieFetchData}
                handleMovieClick={handleMovieClick}
            />
        </div>
    );
};

export default AddFilmToList;

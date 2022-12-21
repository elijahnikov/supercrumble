import {
    FilmListSnippetFragment,
    FilmListVoteMutation,
    useFilmListVoteMutation,
} from '@/generated/graphql';
import { kFormatter } from '@/utils/kFormatter';
import { ApolloCache, gql } from '@apollo/client';
import { BsFillHeartFill } from 'react-icons/bs';
import { FilmListType } from './types';

interface FilmListUpvoteButtonProps {
    filmList?: FilmListType | null;
    variant: 'small' | 'regular' | 'med';
}

const updateAfterVote = (
    value: number,
    filmListId: string,
    cache: ApolloCache<FilmListVoteMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        score: number;
        voteStatus: number | null;
    }>({
        id: 'FilmList:' + filmListId,
        fragment: gql`
            fragment _ on FilmList {
                id
                score
                voteStatus
            }
        `,
    });

    if (data) {
        if (data.voteStatus === value) {
            return;
        }
        const newScore = (data.score as number) + value;
        cache.writeFragment({
            id: 'FilmList:' + filmListId,
            fragment: gql`
                fragment __ on FilmList {
                    score
                    voteStatus
                }
            `,
            data: { score: newScore, voteStatus: value },
        });
    }
};

const FilmListUpvoteButton = ({
    filmList,
    variant,
}: FilmListUpvoteButtonProps) => {
    const [vote] = useFilmListVoteMutation();

    const voteHandler = async () => {
        await vote({
            variables: {
                filmListId: filmList?.filmList?.id!!,
                value: 1,
            },
            update: (cache) =>
                updateAfterVote(status, filmList?.filmList?.id!!, cache),
        });
    };

    let status = 0;
    if (filmList?.filmList?.voteStatus === 1) {
        status = -1;
    } else {
        status = 1;
    }

    return (
        <div className='flex'>
            <div>
                <div
                    onClick={voteHandler}
                    className={`hover:bg-scBlack-100 float-left inline 
                    rounded-md p-1 text-gray-400 hover:cursor-pointer hover:text-white `}
                >
                    <BsFillHeartFill
                        className={`
                            ${
                                filmList?.filmList?.voteStatus === 1
                                    ? 'fill-superRed'
                                    : 'fill-gray-600'
                            }`}
                    />
                </div>
                {variant === 'small' ? (
                    <p className='float-right ml-2 mt-[2px] inline text-[12px] text-white'>
                        {filmList?.filmList?.score
                            ? kFormatter(filmList?.filmList?.score)
                            : 0}{' '}
                        likes
                    </p>
                ) : (
                    <p className={`float-right ml-4 inline text-lg text-white`}>
                        {filmList?.filmList?.score
                            ? kFormatter(filmList?.filmList?.score)
                            : 0}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FilmListUpvoteButton;

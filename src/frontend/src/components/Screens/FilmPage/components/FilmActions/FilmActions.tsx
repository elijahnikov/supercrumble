import { useCreateWatchedMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiShare } from 'react-icons/bi';
import {
    BsFillBookmarkFill,
    BsFillEyeFill,
    BsFillHeartFill,
} from 'react-icons/bs';
import { actionsMap } from './actionsMap';
import ShareAction from './ShareAction/ShareAction';

interface FilmActionsProps {
    filmId: number;
    filmTitle: string;
    posterPath: string;
}

const FilmActions = ({ filmId, filmTitle, posterPath }: FilmActionsProps) => {
    const [shareOpen, setShareOpen] = useState<boolean>(false);
    const router = useRouter();
    const [createWatched] = useCreateWatchedMutation();

    const handleCreateWatched = async () => {
        let response = await createWatched({
            variables: {
                input: {
                    filmId,
                    filmTitle,
                    posterPath,
                },
            },
        });
        if (response.data?.createWatched) {
            toast(`Added ${filmTitle} to watched.`, {
                icon: '✅',
                style: {
                    border: '1px solid #171B23',
                    borderRadius: '10px',
                    background: '#0C1117',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div>
            <Toaster position='bottom-center' reverseOrder={false} />
            <div
                className='inline cursor-pointer p-3'
                onClick={() => setShareOpen(true)}
            >
                <BiShare className='inline hover:fill-superRed' />
            </div>
            <div className='inline p-3'>
                <BsFillHeartFill className='inline cursor-pointer hover:fill-superRed' />{' '}
            </div>
            <div className='inline p-3'>
                <BsFillBookmarkFill className='inline cursor-pointer hover:fill-superRed' />
            </div>
            <div
                className='inline cursor-pointer p-3'
                onClick={() => handleCreateWatched()}
            >
                <BsFillEyeFill className='inline  hover:fill-superRed' />
            </div>

            <ShareAction shareOpen={shareOpen} setShareOpen={setShareOpen} />
        </div>
    );
};

export default FilmActions;

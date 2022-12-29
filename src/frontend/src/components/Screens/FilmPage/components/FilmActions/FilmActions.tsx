import { useCreateWatchedMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

    const handleActionClick = (name: string) => {
        switch (name) {
            case 'share': {
                setShareOpen(true);
            }
            case 'watched': {
                handleCreateWatched();
            }
        }
    };

    return (
        <div>
            <Toaster position='bottom-center' reverseOrder={false} />

            {actionsMap.map((action) => (
                <div
                    className='inline p-3'
                    onClick={() => handleActionClick(action.name)}
                    key={action.id}
                >
                    <action.icon className='inline cursor-pointer hover:fill-superRed' />
                </div>
            ))}
            <ShareAction shareOpen={shareOpen} setShareOpen={setShareOpen} />
        </div>
    );
};

export default FilmActions;

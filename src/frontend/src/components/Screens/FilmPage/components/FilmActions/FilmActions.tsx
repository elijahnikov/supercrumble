import InputField from '@/components/Common/InputField/InputField';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { actionsMap } from './actionsMap';

interface FilmActionsProps {}

interface ShareFilmActionProps {
    shareOpen: boolean;
    setShareOpen: Dispatch<SetStateAction<boolean>>;
}

const FilmActions = ({}: FilmActionsProps) => {
    const [shareOpen, setShareOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleActionClick = (name: string) => {
        switch (name) {
            case 'share': {
                setShareOpen(true);
            }
        }
    };

    return (
        <div>
            {actionsMap.map((action) => (
                <div
                    className='inline p-3'
                    onClick={() => handleActionClick(action.name)}
                    key={action.id}
                >
                    <action.icon className='inline cursor-pointer hover:fill-superRed' />
                </div>
            ))}
            <ShareFilmAction
                shareOpen={shareOpen}
                setShareOpen={setShareOpen}
            />
        </div>
    );
};

const ShareFilmAction = ({ shareOpen, setShareOpen }: ShareFilmActionProps) => {
    const cancelButtonRef = useRef(null);
    const [showCopyText, setShowCopyText] = useState(false);

    const copyURL = () => {
        navigator.clipboard.writeText(
            'localhost:3000' + window.location.pathname
        );
        setShowCopyText(true);
        setTimeout(() => {
            setShowCopyText(false);
        }, 4000);
    };

    return (
        <Transition.Root show={shareOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-20'
                initialFocus={cancelButtonRef}
                onClose={() => setShareOpen(!open)}
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
                                        sm:max-w-xl
                                    '
                            >
                                <div className='rounded-lg bg-crumble-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                    <div className='mb-10 sm:flex sm:items-start'>
                                        <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg font-medium leading-6 text-superRed'
                                            >
                                                Share
                                            </Dialog.Title>
                                            <div className='float-left mt-2  w-[400px]'>
                                                <InputField
                                                    value={
                                                        typeof window !==
                                                        'undefined'
                                                            ? 'supercrumble.com' +
                                                              window.location
                                                                  .pathname
                                                            : ''
                                                    }
                                                    name={'urlLink'}
                                                    placeholder={''}
                                                    type={'text'}
                                                    disabled
                                                    handleChange={() => null}
                                                />
                                                {showCopyText ? (
                                                    <p className='ml-[8px] mt-[1px] text-sm text-superRed'>
                                                        Link copied.
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div
                                                className='mt-5'
                                                onClick={() => copyURL()}
                                            >
                                                <BiCopy className='relative left-2 ml-[5px] h-5 w-5 cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ml-[10px] mt-[-20px] mb-[10px] flex'>
                                        <BsTwitter className='mr-[10px] h-5 w-5 cursor-pointer hover:fill-superRed' />
                                        <BsFacebook className='mr-[10px] h-5 w-5 cursor-pointer hover:fill-superRed' />
                                        <BsInstagram className='mr-[10px] h-5 w-5 cursor-pointer hover:fill-superRed' />
                                    </div>
                                </div>
                                <div className='bg-crumble-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='cancelCreateReview'
                                        ref={cancelButtonRef}
                                        onClick={() => {
                                            setShareOpen(!open);
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default FilmActions;

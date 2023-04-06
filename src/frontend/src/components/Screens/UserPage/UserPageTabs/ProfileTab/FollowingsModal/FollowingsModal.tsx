import { useFollowingsQuery } from '@/generated/graphql';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useRef } from 'react';

interface FollowingsModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    userId: number;
}

const FollowingsModal = ({ open, setOpen, userId }: FollowingsModalProps) => {
    const closeButtonRef = useRef(null);

    const { data, loading, error } = useFollowingsQuery({
        variables: {
            limit: 20,
            userId: userId,
            cursor: null as null | string,
        },
    });

    if (error) setOpen(!open);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-20'
                initialFocus={closeButtonRef}
                onClose={() => setOpen(!open)}
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
                                                Followers
                                            </Dialog.Title>
                                            <div className='float-left mt-5 w-full'>
                                                {loading && <h3>Loading...</h3>}
                                                {data &&
                                                    !loading &&
                                                    data.followings.subscription.map(
                                                        (following) => (
                                                            <Link
                                                                key={
                                                                    following
                                                                        .following
                                                                        .id
                                                                }
                                                                className='flex border-b-[1px] border-slate-800 p-4'
                                                                href={`/@${following.following.username}`}
                                                            >
                                                                <img
                                                                    className='inline h-[30px] w-[30px] rounded-full object-cover'
                                                                    src={
                                                                        following
                                                                            .following
                                                                            .avatar
                                                                            ? following
                                                                                  .following
                                                                                  .avatar
                                                                            : ''
                                                                    }
                                                                    alt='Profile image'
                                                                />
                                                                <p className='ml-2 mt-1'>
                                                                    {
                                                                        following
                                                                            .following
                                                                            .username
                                                                    }
                                                                </p>
                                                            </Link>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-crumble-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='cancelCreateReview'
                                        ref={closeButtonRef}
                                        onClick={() => {
                                            setOpen(!open);
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

export default FollowingsModal;

import { Fragment, useState } from 'react';

// Utils
import clxsm from '@/lib/clsxm';
import { Menu, Transition } from '@headlessui/react';

// Components
import CreateListModal from '../../CreateListModal/CreateListModal';
import CreateReviewModal from '../../CreateReviewModal/CreateReviewModal';
import { BiCommentDetail } from 'react-icons/bi';
import { BsCardList } from 'react-icons/bs';

interface AddModalMenuProps {}

const AddModalMenu = ({}: AddModalMenuProps) => {
    const [reviewOpen, setReviewOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);

    return (
        <>
            <Menu as='div' className='relative mr-10 inline-block text-left'>
                <Menu.Button>
                    <div
                        className={clxsm(
                            'inline-flex items-center rounded px-4 py-2 font-semibold',
                            'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                            'shadow-sm',
                            'justify-center',
                            'transition-colors duration-75',
                            'bg-superRed text-white',
                            'border-none',
                            'text-center',
                            'hover:bg-red-400 hover:text-white',
                            'disabled:bg-red-400 disabled:hover:bg-red-400'
                        )}
                    >
                        Add
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='px-1 py-1 '>
                            <Menu.Item>
                                {/* <CreateReviewModal fromMenu={false} /> */}
                                <button
                                    onClick={() => {
                                        setReviewOpen(!reviewOpen);
                                    }}
                                    className={`group flex w-[100%] items-center rounded-md px-2 py-2 text-sm text-gray-200`}
                                >
                                    <BiCommentDetail className={`mr-2 `} />
                                    Review
                                </button>
                            </Menu.Item>
                            <Menu.Item>
                                <button
                                    onClick={() => {
                                        setListOpen(!listOpen);
                                    }}
                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-200`}
                                >
                                    <BsCardList className={`mr-2 `} />
                                    List
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <CreateReviewModal
                fromMenu={true}
                open={reviewOpen}
                setOpen={setReviewOpen}
            />
            <CreateListModal
                fromMenu={true}
                open={listOpen}
                setOpen={setListOpen}
            />
        </>
    );
};

export default AddModalMenu;

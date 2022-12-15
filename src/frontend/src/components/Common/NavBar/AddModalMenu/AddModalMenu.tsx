import { Menu, Transition } from '@headlessui/react';
import router from 'next/router';
import { Fragment } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import {
    BsPersonFill,
    BsFillGearFill,
    BsPlusSquare,
    BsCardList,
} from 'react-icons/bs';
import Button from '../../Button/Button';
import CreateListModal from '../../CreateListModal/CreateListModal';
import CreateReviewModal from '../../CreateReviewModal/CreateReviewModal';

interface AddModalMenuProps {}

const AddModalMenu = ({}: AddModalMenuProps) => {
    return (
        <>
            <Menu as='div' className='relative mr-10 inline-block text-left'>
                <div>
                    <Menu.Button>
                        <Button>
                            Add
                            <BsPlusSquare className='mx-auto ml-1 inline h-4 w-4 fill-white dark:fill-black  navBar:hover:fill-white' />
                        </Button>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='px-1 py-1 '>
                            <Menu.Item>
                                <CreateReviewModal fromMenu={true} />
                            </Menu.Item>
                            <Menu.Item>
                                <CreateListModal fromMenu={true} />
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

export default AddModalMenu;

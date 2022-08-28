import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { MeQuery, useLogoutMutation, useMeQuery } from '@/generated/graphql';
import { isServer } from '@/utils/isServer';
import { Menu, Transition } from '@headlessui/react';
import { BsFillBellFill, BsFillGearFill, BsPersonFill } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import { navMenu, navMenuMini } from '@/utils/maps/NavMenu';
import { IconType } from 'react-icons/lib';
import CreateReviewModal from '@/components/CreateReviewModal/CreateReviewModal';
import Button from '../Button/Button';
import Link from 'next/link';

interface MainNavBarProps {
    userData?: MeQuery;
}

type MenuType = {
    id: number;
    title: string;
    icon: IconType;
    href: string;
    showTooltip: boolean;
};

const MainNavBar = ({ userData }: MainNavBarProps) => {
    const [currentPath, setCurrentPath] = useState('');
    const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
    const [menu, setMenu] = useState<MenuType[]>([]);

    const [logout, { loading: logoutFetching }] = useLogoutMutation();
    const apolloClient = useApolloClient();

    const router = useRouter();

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        setMenu(navMenu);
    }, []);

    const handleMenuItemHover = (navItemId: number, show: boolean) => {
        let updatedMenuList = menu.map((item) => {
            if (item.id === navItemId) {
                return { ...item, showTooltip: !item.showTooltip };
            }
            return item;
        });

        setMenu(updatedMenuList);
    };

    return (
        <>
            {/* <div className='fixed z-10 m-auto'>
                <div className='fixed right-0 mt-5 inline'>
                    <BsFillBellFill className='mb-8 mr-5 inline h-5 w-5 fill-white' />
                    <Menu
                        as='div'
                        className='relative mr-10 inline-block text-left'
                    >
                        <div>
                            <Menu.Button>
                                <img
                                    className='float-right inline h-[42px] w-[42px] rounded-full object-cover'
                                    src={userData?.me?.avatar!!}
                                    alt='Profile image'
                                />
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
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/@${userData.me?.username}`
                                                    )
                                                }
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-white'
                                                        : 'text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <BsPersonFill
                                                    className={`mr-2 ${
                                                        active
                                                            ? 'fill-white'
                                                            : 'fill-gray-200'
                                                    }`}
                                                />
                                                Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push('/settings')
                                                }
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-white'
                                                        : 'text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <BsFillGearFill
                                                    className={`mr-2 ${
                                                        active
                                                            ? 'fill-white'
                                                            : 'fill-gray-200'
                                                    }`}
                                                />
                                                Settings
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={async () => {
                                                    await logout();
                                                    await apolloClient.resetStore();
                                                    router.push('/');
                                                }}
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-superRed'
                                                        : 'text-superRed'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <Menu
                as='div'
                className='visible absolute inline-block text-right navBarCollapse:invisible'
            >
                <div>
                    <Menu.Button>
                        <div
                            onClick={() =>
                                setBurgerMenuVisible(!burgerMenuVisible)
                            }
                            className='hover:bg-scBlack-100 visible absolute ml-7 h-[40px] w-[40px] cursor-pointer rounded-2xl p-1 navBarCollapse:invisible'
                        >
                            <BiMenu className='h-[100%] w-[100%] fill-white' />
                        </div>
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
                    <Menu.Items className='absolute mt-[50px] ml-8 w-40 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='px-1 py-1 '>
                            {navMenuMini.map((u) => (
                                <Menu.Item key={u.id}>
                                    {({ active }) => (
                                        <div
                                            onClick={() => router.push(u.href)}
                                            className={`${
                                                active
                                                    ? 'bg-crumble-100 text-white'
                                                    : 'text-gray-200'
                                            } group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <div className='mr-2'>
                                                <u.icon />
                                            </div>
                                            <p className='text-[14px]'>
                                                {u.title}
                                            </p>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <div className='z-1 invisible fixed h-[100vh] w-[5vw] min-w-[120px] border-r-[1px] border-r-gray-800 bg-none navBar:w-[25vw] navBarCollapse:visible '>
                <div className='md:flex'>
                    <div className='absolute top-10 ml-[14px] items-center  text-center navBar:right-0'>
                        <img
                            className='pointer-events-none m-5 mr-[10px] h-12 w-12 md:h-12 md:w-12'
                            src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                        />
                        <div>
                            {menu.map((u) => (
                                <div
                                    onClick={() => router.push(u.href)}
                                    onMouseEnter={() =>
                                        handleMenuItemHover(u.id, true)
                                    }
                                    onMouseLeave={() =>
                                        handleMenuItemHover(u.id, false)
                                    }
                                    className='navBar-links-container'
                                    key={u.id}
                                >
                                    <div
                                        className={`navBar-links-icon-container ${
                                            currentPath === u.href
                                                ? 'fill-superRed text-superRed'
                                                : ''
                                        }`}
                                    >
                                        <u.icon />
                                    </div>
                                    {u.showTooltip && (
                                        <div className='text-md absolute left-[120px] mb-[20px] rounded-md bg-crumble-100 p-2'>
                                            {u.title}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div>
                            <CreateReviewModal />
                        </div>
                    </div>
                </div>
            </div> */}
            {/* MAIN NAV */}
            <div className='z-2 relative h-[90px] justify-center bg-none p-5 text-white'>
                {/* VERTICAL ALIGN DIV */}
                <div className='absolute top-[50%] m-0 flex translate-y-[-50%]'>
                    <div className='inline'>
                        <Link href={'/'}>
                            <img
                                className=' inline h-12 w-12 cursor-pointer'
                                src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                            />
                        </Link>
                        <Link href={'/'}>
                            <p className='text-shadow-md bold ml-3 inline cursor-pointer '>
                                supercrumble
                            </p>
                        </Link>
                        <div className='float-right ml-3 mt-1 inline'>
                            <CreateReviewModal />
                        </div>
                    </div>
                </div>
                {/* NAV MENU */}
                <div className='invisible absolute left-[50%] top-[50%] inline translate-x-[-50%]  translate-y-[-50%] navBar:visible'>
                    {navMenu.map((nav) => (
                        // <div className='inline' key={nav.id}>
                        <p
                            onClick={() => router.push(nav.href)}
                            key={nav.id}
                            className={`text-shadow-md ml-10 inline cursor-pointer text-[16px] font-semibold ${
                                currentPath === nav.href
                                    ? 'fill-superRed text-superRed'
                                    : ''
                            }`}
                        >
                            {nav.title.toLocaleUpperCase()}
                        </p>
                        // </div>
                    ))}
                </div>
                <div className='absolute top-[50%] right-0 mt-0 flex translate-y-[-50%]'>
                    <p className='text-shadow-md bold ml-3 mt-2 mr-5 inline'>
                        @{userData?.me?.username}
                    </p>
                    <Menu
                        as='div'
                        className='relative mr-10 inline-block text-left'
                    >
                        <div>
                            <Menu.Button>
                                <img
                                    className='inline h-[42px] w-[42px] rounded-full object-cover'
                                    src={userData?.me?.avatar!!}
                                    alt='Profile image'
                                />
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
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/@${userData?.me?.username}`
                                                    )
                                                }
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-white'
                                                        : 'text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <BsPersonFill
                                                    className={`mr-2 ${
                                                        active
                                                            ? 'fill-white'
                                                            : 'fill-gray-200'
                                                    }`}
                                                />
                                                Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push('/settings')
                                                }
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-white'
                                                        : 'text-gray-200'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <BsFillGearFill
                                                    className={`mr-2 ${
                                                        active
                                                            ? 'fill-white'
                                                            : 'fill-gray-200'
                                                    }`}
                                                />
                                                Settings
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className='px-1 py-1'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={async () => {
                                                    await logout();
                                                    await apolloClient.resetStore();
                                                    router.push('/');
                                                }}
                                                className={`${
                                                    active
                                                        ? 'bg-crumble-100 text-superRed'
                                                        : 'text-superRed'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* <Button className='mr-10'>Add</Button> */}
                </div>
            </div>
        </>
    );
};

export default MainNavBar;

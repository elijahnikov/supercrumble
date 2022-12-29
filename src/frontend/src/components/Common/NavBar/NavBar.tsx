import { Fragment, useEffect, useState } from 'react';

// GraphQL
import { MeQuery, useLogoutMutation } from '@/generated/graphql';

// Utils
import { navMenu } from '@/utils/maps/NavMenu';
import { useApolloClient } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';

// Icons
import { IconType } from 'react-icons/lib';
import {
    BsAlarmFill,
    BsBellFill,
    BsFillGearFill,
    BsPersonFill,
} from 'react-icons/bs';

// Router
import Link from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// Components
import AddModalMenu from './AddModalMenu/AddModalMenu';

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
                            <AddModalMenu />
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
                    <BsBellFill className='mt-[10px] mr-2 h-[20px] w-[20px]' />
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
                                            <NextLink
                                                href='/[username]'
                                                as={`/@${userData?.me?.username}`}
                                            >
                                                <button
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
                                            </NextLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/@${userData?.me?.username}/settings`
                                                    )
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

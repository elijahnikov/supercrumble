
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

interface MainNavBarProps {
    userData: MeQuery;
}

type MenuType = {
    id: number;
    title: string;
    icon: IconType;
    href: string;
    showTooltip: boolean
}

const MainNavBar = ({userData}: MainNavBarProps) => {
    const [currentPath, setCurrentPath] = useState('');
    const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
    const [menu, setMenu] = useState<MenuType[]>([])

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
                return {...item, showTooltip: !item.showTooltip}
            }
            return item;
        })

        setMenu(updatedMenuList)
    }

    return (
        <>
            <div className='fixed z-10 right-0 m-auto'>
                <div className='inline fixed mt-5 right-0'>
                    <BsFillBellFill className='inline fill-white mb-8 mr-5 h-5 w-5'/>
                    <Menu as="div" className="mr-10 relative inline-block text-left">
                        <div>
                            <Menu.Button >
                                <img className="inline object-cover w-[42px] h-[42px] float-right rounded-full" src={userData?.me?.avatar!!} alt="Profile image"/> 
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => router.push(`/@${userData.me?.username}`)}
                                            className={`${
                                            active ? 'bg-crumble-100 text-white' : 'text-gray-200'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <BsPersonFill className={`mr-2 ${active ? "fill-white" : "fill-gray-200"}`}/>
                                            Profile
                                        </button>                                    
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={() => router.push('/settings')}
                                        className={`${
                                        active ? 'bg-crumble-100 text-white' : 'text-gray-200'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <BsFillGearFill className={`mr-2 ${active ? "fill-white" : "fill-gray-200"}`}/>
                                        Settings
                                    </button>
                                    )}
                                </Menu.Item>
                                </div>
                                <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            await apolloClient.resetStore();
                                            router.push('/');
                                        }}
                                        className={`${
                                        active ? 'bg-crumble-100 text-superRed' : 'text-superRed'
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
            <Menu as="div" className="visible navBarCollapse:invisible absolute inline-block text-right">
                <div>
                    <Menu.Button >
                        <div onClick={() => setBurgerMenuVisible(!burgerMenuVisible)} className='cursor-pointer rounded-2xl p-1 ml-7 w-[40px] h-[40px] absolute visible navBarCollapse:invisible hover:bg-scBlack-100'>
                            <BiMenu className='w-[100%] h-[100%] fill-white'/>
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute mt-[50px] ml-8 w-40 origin-top-right divide-y divide-gray-700 rounded-md bg-crumble-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {navMenuMini.map((u) => (
                                <Menu.Item key={u.id}>
                                    {({active}) => (
                                        <div 
                                            onClick={() => router.push(u.href)}
                                            className={`${
                                            active ? 'bg-crumble-100 text-white' : 'text-gray-200'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
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
            <div className='z-1 fixed h-[100vh] w-[5vw] min-w-[120px] invisible navBarCollapse:visible border-r-[1px] border-r-gray-800 bg-none navBar:w-[25vw] '>
                <div className='md:flex'>
                    {/* <div className='md:shrink-0'>
                    <img
                        className='h-48 w-full object-cover md:h-full md:w-48'
                        src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                        alt='Man looking at item at a store'
                    />
                </div> */}
                    <div className='ml-[14px] absolute top-10 navBar:right-0  items-center text-center'>
                        <img
                            className='pointer-events-none m-5 h-12 w-12 mr-[10px] md:h-12 md:w-12'
                            src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                        />
                        <div>
                            {menu.map((u) => (
                                <div 
                                    onClick={() => router.push(u.href)} 
                                    onMouseEnter={() => handleMenuItemHover(u.id, true)} 
                                    onMouseLeave={() => handleMenuItemHover(u.id, false)} 
                                    className='navBar-links-container' 
                                    key={u.id}
                                >
                                    <div className={`navBar-links-icon-container ${currentPath === u.href ? 'fill-superRed text-superRed' : ''}`}>
                                        <u.icon />
                                    </div>
                                    {u.showTooltip &&
                                        <div className='absolute left-[120px] mb-[20px] text-md bg-crumble-100 p-2 rounded-md'>
                                            {u.title}
                                        </div>  
                                    }   
                                </div>
                            ))}
                        </div>
                        <div>
                        {/* <CreatePostModal/> */}
                        <CreateReviewModal/>
                        </div>
                                    
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainNavBar;

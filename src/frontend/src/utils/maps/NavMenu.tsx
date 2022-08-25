import { BsBook, BsCardList, BsEye } from 'react-icons/bs';
import { BiCameraMovie, BiCommentDetail, BiHome, BiLike } from 'react-icons/bi';

export const navMenu = [
    {
        id: 1,
        title: 'Films',
        icon: () => (
            <BiCameraMovie className='h-7 w-7 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/films',
        showTooltip: false,
    },
    {
        id: 2,
        title: 'Diary',
        icon: () => (
            <BsBook className='h-7 w-7 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/diary',
        showTooltip: false,
    },
    {
        id: 3,
        title: 'Reviews',
        icon: () => (
            <BiCommentDetail className='h-7 w-7 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/reviews',
        showTooltip: false,
    },
    {
        id: 4,
        title: 'People',
        icon: () => (
            <BsEye className='h-7 w-7 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/people',
        showTooltip: false,
    },
    {
        id: 5,
        title: 'Lists',
        icon: () => (
            <BsCardList className='h-7 w-7 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/lists',
        showTooltip: false,
    },
];

export const navMenuMini = [
    {
        id: 0,
        title: 'Home',
        icon: () => (
            <BiHome className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/',
        showTooltip: false,
    },
    {
        id: 1,
        title: 'Films',
        icon: () => (
            <BiCameraMovie className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/films',
        showTooltip: false,
    },
    {
        id: 2,
        title: 'Diary',
        icon: () => (
            <BsBook className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/diary',
        showTooltip: false,
    },
    {
        id: 3,
        title: 'Reviews',
        icon: () => (
            <BiCommentDetail className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/reviews',
        showTooltip: false,
    },
    {
        id: 4,
        title: 'Watchlist',
        icon: () => (
            <BsEye className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/watchlist',
        showTooltip: false,
    },
    {
        id: 5,
        title: 'Lists',
        icon: () => (
            <BsCardList className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/lists',
        showTooltip: false,
    },
    {
        id: 6,
        title: 'Likes',
        icon: () => (
            <BiLike className='h-4 w-4 fill-white pl-[2px] dark:fill-black navBar:h-5 navBar:w-5' />
        ),
        href: '/likes',
        showTooltip: false,
    },
];

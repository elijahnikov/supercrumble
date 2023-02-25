import { useRouter } from 'next/router';
import { useState } from 'react';
import { tabMenuType } from './types';
import NextLink from 'next/link';

interface UserPageTabsProps {
    username: string;
}

const UserPageTabs = ({ username }: UserPageTabsProps) => {
    const [currentTabDataName, setCurrentTabDataName] = useState('profile');
    const router = useRouter();

    const tabs: tabMenuType[] = [
        {
            id: 0,
            label: 'PROFILE',
            dataName: 'profile',
            url: `/@${username}`,
        },
        {
            id: 1,
            label: 'FILMS',
            dataName: 'films',
            url: `/@${username}/films`,
        },
        {
            id: 5,
            label: 'DIARY',
            dataName: 'diary',
            url: `/@${username}/diary`,
        },
        {
            id: 2,
            label: 'REVIEWS',
            dataName: 'reviews',
            url: `/@${username}/reviews`,
        },
        {
            id: 3,
            label: 'WATCHLIST',
            dataName: 'watchlist',
            url: `/@${username}/watchlist`,
        },
        {
            id: 4,
            label: 'LISTS',
            dataName: 'lists',
            url: `/@${username}/lists`,
        },
    ];

    return (
        <div className='mt-8 flex w-[100%] rounded-md bg-crumble-200 p-[7px]'>
            {tabs.map((tab: tabMenuType) => (
                <NextLink
                    href={tab.url}
                    key={tab.id}
                    className={`${
                        router.asPath === tab.url
                            ? 'bg-crumble-100'
                            : 'bg-crumble-200 text-gray-400'
                    } ml-1 mr-1 w-[100%] cursor-pointer rounded-md bg-crumble-200 p-2 text-xs hover:bg-crumble-100  hover:text-white `}
                >
                    <div key={tab.id}>
                        <div className='inline'>{tab.label}</div>
                    </div>
                </NextLink>
            ))}
        </div>
    );
};

export default UserPageTabs;

import { useRouter } from 'next/router';
import { useState } from 'react';
import { tabMenuType } from './types';

interface UserPageTabsProps {
    username: string;
}

const UserPageTabs = ({ username }: UserPageTabsProps) => {
    const [currentTabDataName, setCurrentTabDataName] = useState('profile');
    const router = useRouter();

    // const handleTabChange = (tab: string) => {
    //     let path = router.asPath + '/' + tab;
    //     router.push(path);
    // };

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
                <div
                    key={tab.id}
                    onClick={() => router.push(tab.url)}
                    className={`${
                        router.asPath === tab.url
                            ? 'bg-crumble-100'
                            : 'bg-crumble-200 text-gray-400'
                    } ml-1 mr-1 w-[100%] cursor-pointer rounded-md bg-crumble-200 p-2 text-xs hover:bg-crumble-100  hover:text-white `}
                >
                    <div className='inline'>{tab.label}</div>
                </div>
            ))}
        </div>
    );
};

export default UserPageTabs;

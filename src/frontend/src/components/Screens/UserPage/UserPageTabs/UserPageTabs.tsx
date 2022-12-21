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
        <div className='mt-[20px]'>
            <div className='mt-[10px]'>
                {tabs.map((tab: tabMenuType) => (
                    <div
                        key={tab.id}
                        onClick={() => router.push(tab.url)}
                        className={`${
                            router.asPath === tab.url
                                ? 'border-[1px]  border-superRed text-white'
                                : 'border-[1px] border-gray-800 text-superRed'
                        }  inline cursor-pointer p-2 pr-[70px] pl-[70px] text-xs hover:border-b-superRed`}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPageTabs;

import { filmTabs } from '../filmTabs';
import NextLink from 'next/link';
import { getUsername } from '@/utils/getUsername';
import { useRouter } from 'next/router';

type FilmTabType = {
    id: number;
    title: string;
    value: string;
    url: string;
};

interface SecondaryUserPageTabsProps {}

const SecondaryUserPageTabs = ({}: SecondaryUserPageTabsProps) => {
    const username = getUsername();
    const router = useRouter();

    return (
        <div className='z-10 float-left mb-5 mt-[-40px] w-full border-b-[1px] border-slate-500'>
            <div className='flex'>
                {filmTabs.map((tab: FilmTabType) => (
                    // <NextLink
                    //     href={`/@${username}/[tab]`}
                    //     as={`/@${username}/${tab.url}`}
                    // >
                    <div
                        onClick={() => router.push(`/@${username}${tab.url}`)}
                        className={`${
                            router.asPath.includes(tab.url)
                                ? ' text-superRed'
                                : ' text-gray-400'
                        } mr-4 mb-1 cursor-pointer text-sm `}
                    >
                        <div className='cursor-pointer'>{tab.title}</div>
                    </div>
                    // </NextLink>
                ))}
            </div>
        </div>
    );
};

export default SecondaryUserPageTabs;

import { useState } from 'react';
import Cast from './components/Cast/Cast';
import Crew from './components/Crew/Crew';
import Details from './components/Details/Details';
import Genres from './components/Genres/Genres';
import {
    AlternativeTitleType,
    CastObjectType,
    CrewObjectType,
    LanguagesType,
    ProductionCompaniesType,
    ProductionCountriesType,
    tabMenuType,
} from './types';

interface FilmDetailTabsProps {
    cast: CastObjectType[];
    crew: CrewObjectType[];
    companies: ProductionCompaniesType[];
    countries: ProductionCountriesType[];
    languages: LanguagesType[];
    alternativeTitles: AlternativeTitleType[];
    genres: {
        id: number;
        name: string;
    }[];
}

const FilmDetailTabs = ({
    cast,
    crew,
    companies,
    countries,
    languages,
    alternativeTitles,
    genres,
}: FilmDetailTabsProps) => {
    const [currentTabDataName, setCurrentTabDataName] = useState('cast');
    const [tabMap, setTabMap] = useState<tabMenuType[]>([
        {
            id: 0,
            label: 'CAST',
            dataName: 'cast',
            active: true,
        },
        {
            id: 1,
            label: 'CREW',
            dataName: 'crew',
            active: false,
        },
        {
            id: 2,
            label: 'DETAILS',
            dataName: 'details',
            active: false,
        },
        {
            id: 3,
            label: 'GENRES',
            dataName: 'genres',
            active: false,
        },
    ]);

    const handleTabChange = (setTab: string, currentTab: string) => {
        let temp = JSON.parse(JSON.stringify(tabMap));
        let currentTabIndex = temp.findIndex(
            (tab: tabMenuType) => tab.dataName === currentTab
        );
        let setTabIndex = temp.findIndex(
            (tab: tabMenuType) => tab.dataName === setTab
        );
        temp[currentTabIndex].active = false;
        temp[setTabIndex].active = true;
        setCurrentTabDataName(temp[setTabIndex].dataName);
        setTabMap(temp);
    };

    return (
        <div>
            {/* TABS */}
            <div className='mt-[60px]'>
                {tabMap.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() =>
                            handleTabChange(tab.dataName, currentTabDataName)
                        }
                        className={`${
                            tab.active
                                ? 'border-b-[1px] border-b-superRed text-white'
                                : 'border-b-[1px] border-b-gray-600 text-superRed'
                        }   inline cursor-pointer p-2 pr-8 pl-8 text-xs hover:border-b-superRed`}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className='mb-5'>
                <div className='mt-5'>
                    {currentTabDataName === 'cast' && <Cast cast={cast} />}
                    {currentTabDataName === 'crew' && <Crew crew={crew} />}
                    {currentTabDataName === 'details' && (
                        <Details
                            companies={companies}
                            countries={countries}
                            languages={languages}
                            alternativeTitles={alternativeTitles}
                        />
                    )}
                    {currentTabDataName === 'genres' && (
                        <Genres genres={genres} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilmDetailTabs;

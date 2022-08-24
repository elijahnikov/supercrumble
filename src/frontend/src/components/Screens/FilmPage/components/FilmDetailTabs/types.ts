export type CastObjectType = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: number;
    order: number;
};

export type CrewObjectType = {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
};

export type tabMenuType = {
    id: number;
    label: string;
    dataName: string;
    active: boolean;
};

export type ProductionCompaniesType = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};

export type ProductionCountriesType = {
    iso_3166_1: string;
    name: string;
};

export type LanguagesType = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type AlternativeTitleType = {
    iso_3166_1: string;
    title: string;
    type: string;
};

export const showJobs = [
    {
        id: 0,
        title: 'Director',
        label: 'Director',
    },
    {
        id: 1,
        title: 'Producer',
        label: 'Producer',
    },
    {
        id: 2,
        title: 'Screenplay',
        label: 'Screenplay',
    },
    {
        id: 3,
        title: 'Writer',
        label: 'Writer',
    },
    {
        id: 4,
        title: 'Editor',
        label: 'Editor',
    },
    {
        id: 5,
        title: 'Art Direction',
        label: 'Art',
    },
    {
        id: 6,
        title: 'Original Music Composer',
        label: 'Composer',
    },
    {
        id: 7,
        title: 'Sound Designer',
        label: 'Sound',
    },
];

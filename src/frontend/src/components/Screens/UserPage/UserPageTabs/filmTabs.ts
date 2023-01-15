export type FilmTabsType = {
    id: number;
    title: string;
    value: string;
    url: string;
};

export const filmTabs: FilmTabsType[] = [
    {
        id: 1,
        title: 'WATCHED',
        value: 'watched',
        url: '/films',
    },
    {
        id: 2,
        title: 'DIARY',
        value: 'diary',
        url: '/diary',
    },
    {
        id: 3,
        title: 'REVIEWS',
        value: 'reviews',
        url: '/reviews',
    },
];

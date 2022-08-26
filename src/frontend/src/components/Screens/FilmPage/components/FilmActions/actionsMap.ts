import { BiShare } from 'react-icons/bi';
import {
    BsFillBookmarkFill,
    BsFillEyeFill,
    BsFillHeartFill,
} from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

type ActionsTypeMap = {
    id: number;
    name: string;
    variant?: string;
    icon: IconType;
};

export const actionsMap: ActionsTypeMap[] = [
    {
        id: 0,
        name: 'share',
        variant: 'separate',
        icon: BiShare,
    },
    {
        id: 1,
        name: 'like',
        icon: BsFillHeartFill,
    },
    {
        id: 2,
        name: 'save',
        icon: BsFillBookmarkFill,
    },
    {
        id: 3,
        name: 'watched',
        icon: BsFillEyeFill,
    },
];

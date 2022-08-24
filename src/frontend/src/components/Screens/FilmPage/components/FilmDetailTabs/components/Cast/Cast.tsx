import { formatForURL } from '@/utils/url/formatForURL';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CastObjectType } from '../../types';

interface CastProps {
    cast: CastObjectType[];
}

const Cast = ({ cast }: CastProps) => {
    const router = useRouter();

    const [amountShowed, setAmountShowed] = useState(20);
    const [showedAll, setShowedAll] = useState(false);

    const handleShowAll = (amount: number, show: boolean) => {
        setAmountShowed(amount);
        setShowedAll(show);
    };

    return (
        <div>
            <div className='mb-[10px] flex pb-2'>
                <div className='align-right float-right inline w-[450px]'>
                    {cast &&
                        cast.slice(0, amountShowed).map((j: CastObjectType) => (
                            <div
                                onClick={() =>
                                    router.push(
                                        `/actor/${formatForURL(j.name)}-${j.id}`
                                    )
                                }
                                key={j.id}
                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                            >
                                {j.name}
                            </div>
                        ))}
                    {!showedAll ? (
                        <div
                            onClick={() => handleShowAll(cast.length, true)}
                            className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-[1px] border-crumble-100 bg-red-600 p-[5px] text-xs hover:bg-red-500'
                        >
                            Show All...
                        </div>
                    ) : null}
                    {showedAll ? (
                        <div
                            onClick={() => handleShowAll(20, false)}
                            className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-[1px] border-crumble-100 bg-red-600 p-[5px] text-xs hover:bg-red-500'
                        >
                            Hide All...
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Cast;

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

    const [amountShowed, setAmountShowed] = useState(6);
    const [showedAll, setShowedAll] = useState(false);

    const handleShowAll = (amount: number, show: boolean) => {
        setAmountShowed(amountShowed + 12);
        // setShowedAll(show);
    };

    const handleHideAll = () => {
        setAmountShowed(6);
    };

    return (
        <div>
            <br />
            <h2 className='mt-[20px] ml-2 mr-2 inline'>Cast</h2>
            <p className='inline text-sm text-white'>
                {' '}
                {cast && cast.length} Actors
            </p>
            <br />
            <div className='mb-[10px] mt-5 flex pb-2'>
                <div className='inline'>
                    {cast &&
                        cast
                            .filter((obj) => {
                                return obj.profile_path;
                            })
                            .slice(0, amountShowed)
                            .map((j: CastObjectType) => (
                                <div
                                    onClick={() =>
                                        router.push(
                                            `/actor/${formatForURL(j.name)}-${
                                                j.id
                                            }`
                                        )
                                    }
                                    key={j.id}
                                    className='mb-2 ml-2 inline-block cursor-pointer rounded-lg border-t-[1px] border-gray-800 bg-crumble-100 text-xs hover:bg-gray-800'
                                >
                                    {/* {j.name} */}
                                    {j.profile_path ? (
                                        <img
                                            className='aspect-auto h-[162px] rounded-md'
                                            src={`https://image.tmdb.org/t/p/w500/${j.profile_path}`}
                                        />
                                    ) : null}
                                    {/* <span className='break-word'>{j.name}</span> */}
                                </div>
                            ))}
                    {cast?.length > amountShowed ? (
                        <div
                            onClick={() => handleShowAll(cast.length, true)}
                            className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-[1px] border-crumble-100 bg-red-600 p-[5px] text-xs hover:bg-red-500'
                        >
                            Show More...
                        </div>
                    ) : null}
                    <br />
                    {cast?.length <= amountShowed ? (
                        <div
                            onClick={() => handleHideAll()}
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

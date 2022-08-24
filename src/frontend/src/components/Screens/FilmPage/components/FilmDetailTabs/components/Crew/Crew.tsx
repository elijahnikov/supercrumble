import { useEffect, useState } from 'react';
import { CrewObjectType, showJobs } from '../../types';

interface CrewProps {
    crew: CrewObjectType[];
}

const Crew = ({ crew }: CrewProps) => {
    const [jobs, setJobs] = useState<CrewObjectType[]>([]);

    const groupJobs = (arr: CrewObjectType[], property: string) => {
        return arr.reduce(function (memo: any, x: any) {
            if (!memo[x[property]]) {
                memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
        }, {});
    };

    useEffect(() => {
        console.log(groupJobs(crew, 'job'));
        setJobs(groupJobs(crew, 'job'));
    }, []);

    return (
        <div className='mt-5 mb-[-30px] p-2'>
            <div className=' h-[100%] w-[100%]'>
                {jobs ? (
                    <>
                        <br />
                        <div>
                            {showJobs.map(
                                (job: {
                                    id: number;
                                    title: string;
                                    label: string;
                                }) => (
                                    <>
                                        {jobs[job.title] && (
                                            <div className='mt-[-10px] mb-[25px] flex w-[400px] border-b-[1px] border-gray-800'>
                                                <p className='inline text-[14px] text-gray-300'>
                                                    {job.label.toLocaleUpperCase()}
                                                </p>
                                                <div className='align-right float-right ml-auto inline w-[200px] text-right'>
                                                    {jobs[job.title] &&
                                                        jobs[job.title].map(
                                                            (
                                                                j: CrewObjectType
                                                            ) => (
                                                                <div
                                                                    key={j.id}
                                                                    className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                                                >
                                                                    {j.name}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Crew;

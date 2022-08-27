interface GenresProps {
    genres: {
        id: number;
        name: string;
    }[];
}

const Genres = ({ genres }: GenresProps) => {
    return (
        <div className='mt-5 mb-[-30px] p-2'>
            <br />
            <h2 className='mt-[20px] mr-2 inline'>Genres</h2>
            <div className=' h-[100%] w-[100%]'>
                <>
                    <br />
                    <div>
                        <>
                            <div className='mt-[-10px] mb-[25px] flex border-b-[1px] border-gray-800'>
                                <p className='inline text-[14px] text-gray-300'>
                                    GENRES
                                </p>
                                <div className='align-right float-right ml-auto inline w-[400px] text-right'>
                                    {genres.map(
                                        (genre: {
                                            id: number;
                                            name: string;
                                        }) => (
                                            <span
                                                key={genre.id}
                                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                            >
                                                {genre.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                </>
            </div>
        </div>
    );
};

export default Genres;

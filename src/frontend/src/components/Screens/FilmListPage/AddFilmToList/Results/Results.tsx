interface ResultsProps {
    movieFetchData: any[];
    handleMovieClick: (filmId: number) => void;
}

const Results = ({ movieFetchData, handleMovieClick }: ResultsProps) => {
    return (
        <div className='mt-5 grid grid-cols-5 gap-2'>
            {movieFetchData
                ? movieFetchData.slice(0, 6).map((m) =>
                      m.length === 0 ? (
                          <div>Nothing found :/</div>
                      ) : (
                          <div
                              onClick={() => handleMovieClick(m.id)}
                              key={m.id}
                              className='mb-2 inline w-[100px] cursor-pointer rounded-md border-[1px] border-gray-800 p-2 hover:bg-crumble-100'
                          >
                              {m.poster_path ? (
                                  <img
                                      className='inline rounded-md'
                                      src={
                                          m.poster_path
                                              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                                              : undefined
                                      }
                                  />
                              ) : (
                                  <p>?</p>
                              )}
                              <div className='mt-2 inline text-left'>
                                  <p className='inline text-sm'>
                                      {m.original_title.length > 50
                                          ? m.original_title.slice(0, 50) +
                                            '...'
                                          : m.original_title}{' '}
                                  </p>
                                  <p className='inline text-xs text-superRed'>
                                      {m.release_date
                                          ? m.release_date.substring(0, 4)
                                          : null}
                                  </p>
                              </div>
                          </div>
                      )
                  )
                : null}
        </div>
    );
};

export default Results;

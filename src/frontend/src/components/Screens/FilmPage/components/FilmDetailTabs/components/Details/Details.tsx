import {
    ProductionCompaniesType,
    ProductionCountriesType,
    LanguagesType,
    AlternativeTitleType,
} from '../../types';

interface DetailsProps {
    companies: ProductionCompaniesType[];
    countries: ProductionCountriesType[];
    languages: LanguagesType[];
    alternativeTitles: AlternativeTitleType[];
}

const Details = ({
    companies,
    countries,
    languages,
    alternativeTitles,
}: DetailsProps) => {
    return (
        <div className='mt-5 mb-[-30px] p-2'>
            <br />
            <h2 className='mt-[20px] mr-2 inline'>Details</h2>
            <div className=' h-[100%] w-[100%]'>
                <>
                    <br />
                    <div>
                        <>
                            <div className='mt-[-10px] mb-[25px] flex border-b-[1px] border-gray-800'>
                                <p className='inline text-[14px] text-gray-300'>
                                    STUDIOS
                                </p>

                                <div className='align-right float-right ml-auto inline w-[400px] text-right'>
                                    {companies.map(
                                        (company: ProductionCompaniesType) => (
                                            <span
                                                key={company.id}
                                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                            >
                                                {company.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                    <div>
                        <>
                            <div className='mt-[-10px] mb-[25px] flex border-b-[1px] border-gray-800'>
                                <p className='inline text-[14px] text-gray-300'>
                                    COUNTRIES
                                </p>

                                <div className='align-right float-right ml-auto inline w-[400px] text-right'>
                                    {countries.map(
                                        (country: ProductionCountriesType) => (
                                            <span
                                                key={country.iso_3166_1}
                                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                            >
                                                {country.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                    <div>
                        <>
                            <div className='mt-[-10px] mb-[25px] flex border-b-[1px] border-gray-800'>
                                <p className='inline text-[14px] text-gray-300'>
                                    LANGUAGES
                                </p>

                                <div className='align-right float-right ml-auto inline w-[400px] text-right'>
                                    {languages.map(
                                        (language: LanguagesType) => (
                                            <span
                                                key={language.iso_639_1}
                                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                            >
                                                {language.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                    <div>
                        <>
                            <div className='mt-[-10px] mb-[25px] flex border-b-[1px] border-gray-800'>
                                <p className='inline text-[14px] text-gray-300'>
                                    ALTERNATIVE TITLES
                                </p>

                                <div className='align-right float-right ml-auto inline w-[400px] text-right'>
                                    {alternativeTitles.map(
                                        (titles: AlternativeTitleType) => (
                                            <span
                                                key={titles.iso_3166_1}
                                                className='mb-2 ml-2 inline-block cursor-pointer rounded-[5px] border-t-[1px] border-gray-800 bg-crumble-100 p-[5px] text-xs hover:bg-gray-800'
                                            >
                                                {titles.title}
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

export default Details;

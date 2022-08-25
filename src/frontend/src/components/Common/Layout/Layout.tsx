import { useMeQuery } from '@/generated/graphql';
import { useState } from 'react';
import MainNavBar from '../NavBar/NavBar';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showNavBar?: boolean;
    showSearch?: boolean;
    backgroundImage?: string;
}

const Layout = ({ children, ...props }: LayoutProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data, loading, error } = useMeQuery();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            {props.showNavBar ? (
                <div className='z-10'>
                    <MainNavBar userData={data!!} />
                    <img
                        // style={{position: "relative",
                        //       box-shadow: "inset 0 0 10px 10px #000"}}
                        // style={{
                        //     // backgroundColor: '#837960',
                        //     // backgroundImage: `linear-gradient(to bottom, transparent, #837960)`,
                        //     // backgroundRepeat: 'no-repeat',
                        //     background:
                        //         'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 0, 0, 1), rgba(0, 0, 0, 0))',
                        // }}
                        className='test absolute top-0 z-[-1]  object-cover'
                        // className={`absolute top-0 h-[100vh] w-[100vw] bg-[url('https://image.tmdb.org/t/p/original/${props.backgroundImage}')]`}
                        // className='absolute top-0 z-[-1] opacity-70'
                        src={`https://image.tmdb.org/t/p/original/${props.backgroundImage}`}
                    />
                    {/* // ></div> */}
                </div>
            ) : null}
            <div className='layout-container'>
                {/* {props.showSearch ? (
                    <div className='mx-auto mt-5 w-[70%]'>
                        <h1>test</h1>
                        <InputField
                            placeholder='search for anything'
                            name='search'
                            type='text'
                            handleChange={handleSearch}
                        />
                    </div>
                ) : null}
                {props.title && (
                    <h2 className='ml-[180px] mt-5 mb-[-20px]'>
                        {props.title}
                    </h2>
                )} */}
                {children}
            </div>
        </div>
    );
};

export default Layout;

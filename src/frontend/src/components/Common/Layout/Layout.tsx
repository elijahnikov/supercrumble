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
                    {props.backgroundImage && (
                        <img
                            className='test absolute top-0 z-[-1] object-cover'
                            src={`https://image.tmdb.org/t/p/original/${props.backgroundImage}`}
                        />
                    )}
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
            {/* <div className='absolute bottom-[0vh] left-0 text-white'>test</div> */}
        </div>
    );
};

export default Layout;

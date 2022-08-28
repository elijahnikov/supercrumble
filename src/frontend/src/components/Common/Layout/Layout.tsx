import { useMeQuery } from '@/generated/graphql';
import { useState } from 'react';
import Footer from '../Footer/Footer';
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
        <div className='h-[100% m-0 min-h-[100%] p-0'>
            {props.showNavBar ? (
                <div className='z-10'>
                    <MainNavBar userData={data ? data!! : undefined} />
                    {props.backgroundImage && (
                        <img
                            className='test absolute top-0 z-[-1] object-cover'
                            src={`https://image.tmdb.org/t/p/original/${props.backgroundImage}`}
                        />
                    )}
                </div>
            ) : null}
            <div className='layout-container'>{children}</div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;

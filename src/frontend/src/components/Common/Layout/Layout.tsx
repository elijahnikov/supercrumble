import { useMeQuery } from '@/generated/graphql';
import * as React from 'react';
import MainNavBar from '../NavBar/NavBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {

    const {data, loading, error} = useMeQuery()

    return (
        <div> 
            <div className='z-10'>
                <MainNavBar userData={data!!}/>
            </div>
            <div className='navBarCollapse:w-[60%] navBarCollapse:left-[20vw] absolute left-[13vw] float-left w-[70%] h-[100%] border-r-[1px] border-l-[1px] border-crumble-100'>
                {children}
            </div>
        </div>
    )
};

export default Layout;

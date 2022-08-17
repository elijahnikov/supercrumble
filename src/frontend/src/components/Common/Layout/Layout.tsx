import { useMeQuery } from '@/generated/graphql';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import InputField from '../InputField/InputField';
import MainNavBar from '../NavBar/NavBar';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showNavBar?: boolean;
    showSearch?: boolean
}

const Layout = ({children, ...props}: LayoutProps) => {

    const [searchTerm, setSearchTerm] = useState("")

    const {data, loading, error} = useMeQuery()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div> 
            {props.showNavBar ? (
                <div className='z-10'>
                    <MainNavBar userData={data!!}/>
                </div>
            ) : null}
            <div className='layout-container'>
                {props.showSearch ? (
                    <div className='w-[70%] mx-auto mt-5'>
                        <InputField 
                            placeholder='search for anything' 
                            name='search' 
                            type='text' 
                            onChangeHandler={handleSearch}
                        />
                    </div>
                ) : null}
                {props.title && <h2 className='ml-[180px] mt-5 mb-[-20px]'>{props.title}</h2>}
                {children}
            </div>
        </div>
    )
};

export default Layout;

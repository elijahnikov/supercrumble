import { useMeQuery } from '@/generated/graphql';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import InputField from '../InputField/InputField';
import MainNavBar from '../NavBar/NavBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {

    const [searchTerm, setSearchTerm] = useState("")

    const {data, loading, error} = useMeQuery()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div> 
            <div className='z-10'>
                <MainNavBar userData={data!!}/>
            </div>
            <div className='layout-container'>
                <div className='w-[70%] mx-auto mt-5'>
                    <InputField 
                        placeholder='search for anything' 
                        name='search' 
                        type='text' 
                        onChangeHandler={handleSearch}
                    />
                </div>
                {children}
            </div>
        </div>
    )
};

export default Layout;

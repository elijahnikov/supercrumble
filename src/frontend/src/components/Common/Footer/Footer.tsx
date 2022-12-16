import Link from 'next/link';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

interface FooterProps {}

const Footer = ({}: FooterProps) => {
    return (
        <div
            className='z-10 clear-both mt-[-3] 
                        block h-[150px] border-t-[1px] 
                        border-crumble-100 bg-crumble-300 
                        text-white'
        >
            <div className='absolute top-[50%] ml-10 flex translate-y-[-50%]'>
                <div className='inline'>
                    <Link href={'/'}>
                        <img
                            className=' inline h-12 w-12 cursor-pointer'
                            src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                        />
                    </Link>
                    <Link href={'/'}>
                        <p className='text-shadow-md bold ml-3 inline cursor-pointer text-white hover:text-superRed'>
                            supercrumble
                        </p>
                    </Link>
                    <p className='ml-2 inline text-xs text-superRed'>
                        © 2022. SuperCrumble.
                    </p>
                </div>
            </div>
            <div className='absolute top-[50%] right-0 mr-20 flex translate-y-[-50%]'>
                <BsTwitter className='mr-4 mt-[1px] fill-gray-400' />
                <BsInstagram className='mr-4 mt-[1px] fill-gray-400' />
                <BsLinkedin className='mt-[1px] fill-gray-400' />
            </div>
        </div>
    );
};

export default Footer;

import { withApollo } from '@/utils/withApollo';

interface diaryProps {}

const diary = ({}: diaryProps) => {
    return (
        <div className='h-[2000px] bg-blue-500 text-white'>
            {/* <div className=''> */}
            <p className='stickDiv mt-[200px]'>test</p>
            {/* </div> */}
        </div>
    );
};

export default withApollo({ ssr: true })(diary);

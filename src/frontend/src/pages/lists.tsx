// Utils
import { LISTS_BACKGROUND_IMAGE } from '@/utils/consts';
import { withApollo } from '@/utils/withApollo';

// Router
import { useRouter } from 'next/router';

// Components
import PopularFilmLists from '@/components/Screens/FilmListsPage/PopularFilmLists/PopularFilmLists';
import Layout from '@/components/Common/Layout/Layout';
import CreateListModal from '@/components/Common/CreateListModal/CreateListModal';
import PopularTags from '@/components/Screens/FilmListsPage/PopularTags/PopularTags';
import MostRecentFilmLists from '@/components/Screens/FilmListsPage/MostRecentFilmLists/MostRecentFilmLists';

interface ListsPageProps {}

const ListsPage = ({}: ListsPageProps) => {
    const router = useRouter();

    return (
        <Layout
            showNavBar={true}
            showSearch={true}
            backgroundImage={LISTS_BACKGROUND_IMAGE}
        >
            <div className='mb-20 flex justify-center'>
                <div className='pageFrame h-[100vh] text-center'>
                    <h1 className='mt-10'>
                        Your place to organise <br /> what you want to see most.
                    </h1>
                    <CreateListModal />
                    <div className='z-[-1] mt-[-40px]'>
                        <PopularFilmLists />
                    </div>
                    <div className='mt-20 w-[69vw]'>
                        <div className='float-left h-[10vh] w-[80%]'>
                            <MostRecentFilmLists />
                        </div>
                        <div className='float-right h-[10vh] w-[20%]'>
                            <PopularTags />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ListsPage);

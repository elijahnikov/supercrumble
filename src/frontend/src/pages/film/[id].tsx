import FilmPageComponent from '@/components/Screens/FilmPage/FilmPageComponent';
import { withApollo } from '@/utils/withApollo';

interface FilmPageProps {}

const FilmPage = ({}: FilmPageProps) => {
    return <FilmPageComponent />;
};

export default withApollo({ ssr: true })(FilmPage);

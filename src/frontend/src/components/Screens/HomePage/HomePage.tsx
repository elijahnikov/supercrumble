import { useMeQuery } from "@/generated/graphql";
import LoggedIn from "./LoggedIn/LoggedIn";
import NotLoggedIn from "./NotLoggedIn/NotLoggedIn";
import Onboarding from "./Onboarding/Onboarding";

interface HomePageProps {

}

const HomePage = ({}: HomePageProps) => {

    const {data} = useMeQuery();

    let body = null;
    if (!data?.me) {
        body = <NotLoggedIn/>
    } else if (!data.me.onboarded) {
        body = <Onboarding userData={data}/>
    } else if (data.me) {
        body = <LoggedIn/>
    }

    return (
        <>
            {body}
        </>
    )
}

export default HomePage;
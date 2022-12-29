import Layout from '@/components/Common/Layout/Layout';
import EmailTab from '@/components/Screens/UserSettingsPage/EmailTab/EmailTab';
import NotificationsTab from '@/components/Screens/UserSettingsPage/NotificationsTab/NotificationsTab';
import PasswordTab from '@/components/Screens/UserSettingsPage/PasswordTab/PasswordTab';
import PrivacyTab from '@/components/Screens/UserSettingsPage/PrivacyTab/PrivacyTab';
import ProfileTab from '@/components/Screens/UserSettingsPage/ProfileTab/ProfileTab';
import { useMeQuery } from '@/generated/graphql';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type SettingsMenuType = {
    id: number;
    label: string;
    dataName: string;
    active: boolean;
};

interface settingsProps {}

const Settings = ({}: settingsProps) => {
    const router = useRouter();
    const { data, loading, error } = useMeQuery();
    const [allowed, setAllowed] = useState(false);
    const [currentMenuDataName, setCurrentMenuDataName] = useState('profile');
    const [settingsMenu, setSettingsMenu] = useState<SettingsMenuType[]>([
        {
            id: 1,
            label: 'Profile',
            dataName: 'profile',
            active: true,
        },
        {
            id: 2,
            label: 'Password',
            dataName: 'password',
            active: false,
        },
        {
            id: 3,
            label: 'Email',
            dataName: 'email',
            active: false,
        },
        {
            id: 4,
            label: 'Notifications',
            dataName: 'notifications',
            active: false,
        },
        {
            id: 5,
            label: 'Privacy',
            dataName: 'privacy',
            active: false,
        },
    ]);

    useEffect(() => {
        let username =
            typeof router.query.username === 'string'
                ? router.query.username.substring(1)
                : '';
        if (data?.me?.username !== username) {
            router.replace('/');
        } else {
            setAllowed(true);
        }
    }, []);

    const handleTabChange = (setTab: string, currentTab: string) => {
        let temp = JSON.parse(JSON.stringify(settingsMenu));
        let currentTabIndex = temp.findIndex(
            (tab: SettingsMenuType) => tab.dataName === currentTab
        );
        let setTabIndex = temp.findIndex(
            (tab: SettingsMenuType) => tab.dataName === setTab
        );
        temp[currentTabIndex].active = false;
        temp[setTabIndex].active = true;
        setCurrentMenuDataName(temp[setTabIndex].dataName);
        setSettingsMenu(temp);
    };

    return (
        <Layout showNavBar={true}>
            <div className='mb-20 flex justify-center'>
                {allowed && (
                    <div className='mediumPageFrame mt-[-0px] h-[100vh] p-10  text-center'>
                        <div className='w-[20%]'>
                            <h2 className='float-left w-[100%] text-left'>
                                Settings
                            </h2>
                            <div className='float-left mt-10'>
                                {settingsMenu.map(
                                    (setting: SettingsMenuType) => (
                                        <div
                                            onClick={() =>
                                                handleTabChange(
                                                    setting.dataName,
                                                    currentMenuDataName
                                                )
                                            }
                                            key={setting.id}
                                            className={`${
                                                setting.active
                                                    ? 'border-[1px] border-superRed bg-crumble-100 text-superRed'
                                                    : ' text-white'
                                            } mt-2 mb-2 cursor-pointer rounded-md  p-3`}
                                        >
                                            <p className='text-left font-semibold'>
                                                {setting.label}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className='float-right mb-5 w-[80%]'>
                            <div className='mt-5'>
                                {currentMenuDataName === 'profile' && (
                                    <ProfileTab user={data!!} />
                                )}
                                {currentMenuDataName === 'password' && (
                                    <PasswordTab />
                                )}
                                {currentMenuDataName === 'email' && (
                                    <EmailTab />
                                )}
                                {currentMenuDataName === 'notifications' && (
                                    <NotificationsTab />
                                )}
                                {currentMenuDataName === 'privacy' && (
                                    <PrivacyTab />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(Settings);

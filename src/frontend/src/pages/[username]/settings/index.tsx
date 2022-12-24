import Layout from '@/components/Common/Layout/Layout';
import { withApollo } from '@/utils/withApollo';
import { useState } from 'react';

export type SettingsMenuType = {
    id: number;
    label: string;
    dataName: string;
    active: boolean;
};

interface settingsProps {}

const Settings = ({}: settingsProps) => {
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
    ]);

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
                <div className='mediumPageFrame h-[100vh] p-10  text-center'>
                    <div className='w-[20%] bg-blue-400'>
                        <h2 className='float-left w-[100%] text-left'>
                            Settings
                        </h2>
                        <div className='float-left mt-10'>
                            {settingsMenu.map((setting: SettingsMenuType) => (
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
                            ))}
                        </div>
                    </div>
                    <div className='float-right mb-5 w-[80%] bg-red-400'>
                        <div className='mt-5'>
                            {currentMenuDataName === 'profile' && (
                                <p>profile</p>
                            )}
                            {currentMenuDataName === 'password' && (
                                <p>password</p>
                            )}
                            {currentMenuDataName === 'email' && <p>email</p>}
                            {currentMenuDataName === 'notifications' && (
                                <p>notifications</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: true })(Settings);

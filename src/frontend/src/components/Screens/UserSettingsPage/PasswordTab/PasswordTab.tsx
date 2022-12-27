import Button from '@/components/Common/Button/Button';
import InputField from '@/components/Common/InputField/InputField';
import {
    MeQuery,
    useSettingsChangePasswordMutation,
} from '@/generated/graphql';
import { useState } from 'react';

interface PasswordTabProps {}

const PasswordTab = ({}: PasswordTabProps) => {
    const [changePassword] = useSettingsChangePasswordMutation();

    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangePassword = async () => {
        if (inputs.newPassword !== inputs.newPasswordConfirm) {
            setError('Please correctly confirm new password');
        } else {
            const response = await changePassword({
                variables: {
                    currentPassword: inputs.currentPassword,
                    settingsNewPassword: inputs.newPassword,
                },
            });

            if (response.data?.settingsChangePassword.errors) {
                setError(
                    response.data.settingsChangePassword.errors[0].message
                );
            } else if (response.data?.settingsChangePassword.user) {
                setError('');
            }
        }
    };

    return (
        <div className='p-5'>
            <div className='float-left text-left'>
                <h3>Password</h3>
                <p className='text-sm text-superRed'>
                    Please enter your current password to change your password.
                </p>
            </div>
            <div className='mt-[100px] ml-2 h-[100px] w-[100%]'>
                <div className='flex'>
                    <p className='mt-2 w-[230px] text-left'>Current password</p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'password'}
                            name={'currentPassword'}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 w-[230px] text-left'>New password</p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'password'}
                            name='newPassword'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 w-[230px] text-left'>
                        Confirm new password
                    </p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'password'}
                            name='newPasswordConfirm'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                {error && (
                    <p className='float-left mt-5 text-superRed'>{error}</p>
                )}

                <div className='float-left clear-both mt-10 mr-10'>
                    <Button onClick={() => handleChangePassword()}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default PasswordTab;

import Button from '@/components/Common/Button/Button';
import InputField from '@/components/Common/InputField/InputField';
import { useSettingsChangeEmailMutation } from '@/generated/graphql';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface EmailTabProps {}

const EmailTab = ({}: EmailTabProps) => {
    const [changeEmail] = useSettingsChangeEmailMutation();

    const [inputs, setInputs] = useState({
        currentEmail: '',
        newEmail: '',
        newEmailConfirm: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeEmail = async () => {
        if (inputs.newEmail !== inputs.newEmailConfirm) {
            setError('Please correctly confirm new e-mail.');
        } else {
            const response = await changeEmail({
                variables: {
                    currentEmail: inputs.currentEmail,
                    newEmail: inputs.newEmail,
                },
            });

            if (response.data?.settingsChangeEmail.errors) {
                setError(response.data.settingsChangeEmail.errors[0].message);
            } else if (response.data?.settingsChangeEmail.user) {
                setError('');
                toast('E-mail has been updated.', {
                    icon: '✅',
                    style: {
                        border: '1px solid #171B23',
                        borderRadius: '10px',
                        background: '#0C1117',
                        color: '#fff',
                    },
                });
                setInputs({
                    currentEmail: '',
                    newEmail: '',
                    newEmailConfirm: '',
                });
            }
        }
    };

    return (
        <div className='p-5'>
            <Toaster position='bottom-center' reverseOrder={false} />
            <div className='float-left text-left'>
                <h3>E-mail</h3>
                <p className='text-sm text-superRed'>
                    Please enter your current email to change your email.
                </p>
            </div>
            <div className='mt-[100px] ml-2 h-[100px] w-[100%]'>
                <div className='flex'>
                    <p className='mt-2 w-[230px] text-left'>Current e-mail</p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'text'}
                            name={'currentEmail'}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 w-[230px] text-left'>New e-mail</p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'text'}
                            name={'newEmail'}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 w-[230px] text-left'>
                        Confirm new e-mail
                    </p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'text'}
                            name={'newEmailConfirm'}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                {error && (
                    <p className='float-left mt-5 text-superRed'>{error}</p>
                )}

                <div className='float-left clear-both mt-10 mr-10'>
                    <Button onClick={() => handleChangeEmail()}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default EmailTab;

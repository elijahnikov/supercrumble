import { useRouter } from 'next/router';
import {
    MeQuery,
    useEditUserDetailsMutation,
    useSignS3Mutation,
} from '@/generated/graphql';
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Common/Layout/Layout';
import InputField from '@/components/Common/InputField/InputField';
import InputArea from '@/components/Common/InputArea/InputArea';
import Dropzone from 'react-dropzone';
import Button from '@/components/Common/Button/Button';

interface OnboardingProps {
    userData: MeQuery;
}

const Onboarding = ({ userData }: OnboardingProps) => {
    const router = useRouter();
    const [editUserDetails] = useEditUserDetailsMutation();
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [bio, setBio] = useState('');
    const [file, setFile] = useState({
        name: '',
        type: '',
    });
    const [signS3] = useSignS3Mutation();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        bio: '',
        bioLink: '',
        displayName: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onDrop = (files: any[]) => {
        setFile(files[0]);
    };

    const uploadToS3 = async (
        file: { type: string; name: string },
        signedRequest: string
    ) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            },
        };
        await axios.put(signedRequest, file, options);
    };

    const handleSave = async () => {
        console.log(inputs);
        setLoading(true);
        const s3Response = await signS3({
            variables: {
                filename: file.name,
                filetype: file.type,
            },
        });
        const { signedRequest, url } = s3Response.data!.signS3;
        await uploadToS3(file, signedRequest);

        const response = await editUserDetails({
            variables: {
                input: {
                    avatar: url,
                    bio: inputs.bio,
                    bioLink: inputs.bioLink,
                    displayName: inputs.displayName,
                    onboarded: true,
                },
            },
        });
        setLoading(false);
        if (response.data?.editUserDetails.errors) {
            setError(response.data.editUserDetails.errors[0].message);
        }
    };

    const handleSkip = async () => {
        setLoading(true);
        const response = await editUserDetails({
            variables: {
                input: {
                    onboarded: true,
                },
            },
        });
        setLoading(false);
        if (response.data?.editUserDetails.errors) {
            setError(response.data.editUserDetails.errors[0].message);
        }
    };

    return (
        <Layout>
            <div className='layout flex min-h-screen w-[20vw] flex-col items-center justify-center text-center'>
                <div className='mt-[-90px] w-full'>
                    <h1 className='mb-12 text-white'>Tell us about yourself</h1>
                    <form onSubmit={undefined}>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <InputField
                                className='py2 w-full rounded border-gray-800 bg-crumble-200 px-3 text-gray-700'
                                type={'text'}
                                name='displayName'
                                placeholder='display name'
                                label='Display Name'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <div>
                                <label className='text-sm font-bold text-white'>
                                    About yourself
                                </label>
                            </div>
                            <InputArea
                                name={'bio'}
                                onChange={(e) => handleChange(e)}
                                placeholder='Write your throughs'
                            />
                        </div>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <InputField
                                className='py2 w-full rounded border-gray-800 bg-crumble-200 px-3 text-gray-700'
                                type={'text'}
                                name='bioLink'
                                placeholder='link'
                                label='Bio Link'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <div>
                                <label className='text-sm font-bold text-white'>
                                    Profile Picture
                                </label>
                            </div>
                            <Dropzone onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        className='
                                            h-[70px]
                                            w-full
                                            rounded-md
                                            border-[1px]
                                            border-gray-800
                                            bg-crumble-100
                                            p-3
                                            text-center
                                            text-gray-400
                                        '
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <div>
                                            <p>
                                                {file?.name
                                                    ? file.name
                                                    : "Drag 'n' drop your picture here, or click to select a file."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {error && <p className='mt-2 text-superRed'>{error}</p>}
                        <div className='w-full'>
                            <Button
                                variant='secondary'
                                onClick={handleSkip}
                                isLoading={loading}
                                type='submit'
                                className='mt-8 mr-4 w-[45%]'
                            >
                                Skip
                            </Button>
                            <Button
                                variant='primary'
                                onClick={handleSave}
                                isLoading={loading}
                                type='submit'
                                className='mt-8 w-[45%]'
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Onboarding;

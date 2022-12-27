import Button from '@/components/Common/Button/Button';
import InputArea from '@/components/Common/InputArea/InputArea';
import InputField from '@/components/Common/InputField/InputField';
import {
    MeQuery,
    useCheckIfUsernameTakenLazyQuery,
    useEditUserDetailsMutation,
    useSignS3Mutation,
} from '@/generated/graphql';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { BsPencil, BsUpload } from 'react-icons/bs';

interface ProfileTabProps {
    user: MeQuery;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
    const router = useRouter();
    const [checkUsername] = useCheckIfUsernameTakenLazyQuery();
    const [signS3] = useSignS3Mutation();
    const [editUserDetails] = useEditUserDetailsMutation();

    const [avatarFile, setAvatarFile] = useState({
        name: '',
        type: '',
        preview: '',
    });
    const [headerFile, setHeaderFile] = useState({
        name: '',
        type: '',
        preview: '',
    });
    const [hasEdited, setHasEdited] = useState<boolean>(false);
    const [usernameTaken, setUsernameTaken] = useState<
        'taken' | 'available' | 'none'
    >('none');
    const [inputs, setInputs] = useState({
        bio: user.me?.bio,
        bioLink: user.me?.bioLink,
        displayName: user.me?.displayName,
        username: user.me?.username,
    });

    //save inputs from all input fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setHasEdited(true);
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //uploading avatar image
    const onAvatarDrop = (files: any[]) => {
        let temp = Object.assign(files[0], {
            preview: URL.createObjectURL(files[0]),
        });
        setAvatarFile(temp);
        setHasEdited(true);
    };

    //uploading header image
    const onHeaderDrop = (files: any[]) => {
        let temp = Object.assign(files[0], {
            preview: URL.createObjectURL(files[0]),
        });
        setHeaderFile(temp);
        setHasEdited(true);
    };

    //cancel click
    const handleCancel = () => {
        setAvatarFile({
            name: '',
            type: '',
            preview: '',
        });
        setHeaderFile({
            name: '',
            type: '',
            preview: '',
        });
        setHasEdited(false);
        setInputs({
            bio: user.me?.bio,
            bioLink: user.me?.bioLink,
            displayName: user.me?.displayName,
            username: user.me?.username,
        });
    };

    const handleSave = async () => {
        let avatarUrl = user.me?.avatar;
        let headerUrl = user.me?.header;

        if (headerFile.preview) {
            const s3HeaderResponse = await signS3({
                variables: {
                    filename: headerFile.name,
                    filetype: headerFile.type,
                },
            });
            const { signedRequest: headerSignedRequest } =
                s3HeaderResponse.data!.signS3;
            headerUrl = s3HeaderResponse.data!.signS3.url;

            await uploadToS3(headerFile, headerSignedRequest);
        }

        if (avatarFile.preview) {
            const s3AvatarResponse = await signS3({
                variables: {
                    filename: avatarFile.name,
                    filetype: avatarFile.type,
                },
            });
            const { signedRequest: avatarSignedRequest } =
                s3AvatarResponse.data!.signS3;
            avatarUrl = s3AvatarResponse.data!.signS3.url;
            await uploadToS3(avatarFile, avatarSignedRequest);
        }

        const response = await editUserDetails({
            variables: {
                input: {
                    avatar: avatarUrl,
                    header: headerUrl,
                    bio: inputs.bio,
                    bioLink: inputs.bioLink,
                    displayName: inputs.displayName,
                    username: inputs.username,
                },
            },
        });
        if (response.data?.editUserDetails.user) {
            // router.reload();
            router.push(`/@${inputs.username}/settings`);
            setUsernameTaken('none');
        }
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

    //after 1 second, check if username is taken
    //check if username text is not empty or not equal to current user
    useEffect(() => {
        setUsernameTaken('none');
        const delayDebounceFn = setTimeout(() => {
            if (
                inputs.username !== '' &&
                inputs.username !==
                    router.query.username!!.toString().substring(1)
            ) {
                checkUsername({
                    variables: {
                        username: inputs.username!!,
                    },
                }).then((data) => {
                    if (data.data?.checkIfUsernameTaken) {
                        setUsernameTaken('taken');
                    } else {
                        setUsernameTaken('available');
                    }
                });
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [inputs.username]);

    //revoke image objects to not hog memory
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatarFile.preview);
            URL.revokeObjectURL(headerFile.preview);
        };
    }, []);

    return (
        <div className='p-5'>
            {headerFile.preview ? (
                <img
                    src={headerFile.preview}
                    className='h-[200px] w-[100%] rounded-xl'
                />
            ) : user.me?.header ? (
                <img
                    src={user.me.header}
                    className='h-[200px] w-[100%] rounded-xl'
                />
            ) : (
                <div className='relative h-[200px] w-[100%] rounded-xl bg-green-400 bg-gradient-to-tr from-white via-lime-100 to-indigo-200' />
            )}
            <Dropzone onDrop={onHeaderDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button
                            variant='transparent'
                            className='relative top-[-45px] float-right mr-4 bg-crumble-200 opacity-50'
                        >
                            <BsPencil />
                        </Button>
                    </div>
                )}
            </Dropzone>
            <div className='flex w-[80%]'>
                <Dropzone onDrop={onAvatarDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img
                                className='relative top-[-45px]
                                        ml-8 
                                        h-[120px] w-[120px] 
                                        cursor-pointer rounded-full 
                                        bg-red-400 object-cover'
                                src={
                                    avatarFile.preview
                                        ? avatarFile.preview
                                        : user.me?.avatar
                                        ? user.me.avatar
                                        : ''
                                }
                                alt='Profile image'
                            />
                        </div>
                    )}
                </Dropzone>

                <div className='m-3'>
                    <h3>{user.me?.displayName}</h3>
                    <p className='float-left text-sm text-slate-500'>
                        @{user.me?.username}
                    </p>
                </div>
            </div>
            {hasEdited && (
                <div className='relative top-[-95px] float-right w-[30%]'>
                    <Button onClick={() => handleCancel()} variant='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} className='ml-5'>
                        Save
                    </Button>
                </div>
            )}
            <div className='mt-10 ml-2 h-[100px] w-[100%]'>
                <div className='flex'>
                    <p className='mt-2 mr-20 w-[230px] text-left'>Username</p>
                    <div className='w-[380px]'>
                        <InputField
                            leftInfo='supercrumble.com/@'
                            className={`${
                                usernameTaken === 'taken'
                                    ? 'border-superRed'
                                    : usernameTaken === 'available'
                                    ? 'border-green-400'
                                    : 'border-gray-800'
                            }`}
                            type={'text'}
                            value={inputs.username!!}
                            name='username'
                            placeholder='Username'
                            onChange={(e) => handleChange(e)}
                        />
                        {usernameTaken === 'taken' ? (
                            <p className='relative ml-[70px] mt-2 text-sm text-superRed'>
                                Username is taken
                            </p>
                        ) : usernameTaken === 'available' ? (
                            <p className='relative ml-[95px] mt-2 text-sm text-green-400'>
                                Username is available
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 mr-20 w-[230px] text-left'>
                        Display name
                    </p>
                    <div className='w-[380px]'>
                        <InputField
                            type={'text'}
                            value={inputs.displayName!!}
                            name='displayName'
                            placeholder='Display name'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 mr-20 w-[230px]  text-left'>Website</p>
                    <div className='w-[380px]'>
                        <InputField
                            leftInfo='https://'
                            type={'text'}
                            value={inputs.bioLink!!}
                            name='bioLink'
                            placeholder='Link'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                <div className='mt-8 w-[98%] border-b-[0.5px] border-slate-700' />

                <div className='mt-8 flex'>
                    <p className='mt-2 mr-20 w-[230px] text-left'>About you</p>
                    <div className='w-[380px]'>
                        <InputArea
                            value={inputs.bio!!}
                            name='bio'
                            placeholder='Enter a bit about yourself...'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;

import { useRouter } from "next/router";
import { MeQuery, useEditUserDetailsMutation, useSignS3Mutation} from '@/generated/graphql'
import React, { useState } from "react";
import axios from 'axios'
import Layout from "@/components/Common/Layout/Layout";
import InputField from "@/components/Common/InputField/InputField";
import InputArea from "@/components/Common/InputArea/InputArea";
import Dropzone from "react-dropzone"
import Button from "@/components/Common/Button/Button";

interface OnboardingProps {
    userData: MeQuery;
}

const Onboarding = ({userData}: OnboardingProps) => {

    const router = useRouter();
    const [editUserDetails] = useEditUserDetailsMutation();
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("")
    const [bio, setBio] = useState("")
    const [file, setFile] = useState({
        name: "",
        type: ""
    })
    const [signS3] = useSignS3Mutation();
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        bio: "",
        bioLink: "",
        displayName: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onDrop = (files: any[]) => {
        setFile(files[0])
    }

    const uploadToS3 = async (file: {type: string, name: string}, signedRequest: string) => {
        const options = {
            headers: {
                "Content-Type": file.type
            }
        }
        await axios.put(signedRequest, file, options)
    }

    const handleSave = async () => {
        setLoading(true)
        const s3Response = await signS3({
            variables: {
                filename: file.name,
                filetype: file.type
            }
        })
        const {signedRequest, url} = s3Response.data!.signS3;
        await uploadToS3(file, signedRequest)

        const response = await editUserDetails({
            variables: {
                input: {
                    avatar: url,
                    bio: inputs.bio,
                    bioLink: inputs.bioLink,
                    displayName: inputs.displayName,
                    onboarded: true
                }
            }
        })
        setLoading(false)
        if (response.data?.editUserDetails.errors) {
            setError(response.data.editUserDetails.errors[0].message)
        }
    }

    const handleSkip = async () => {
        setLoading(true);
        const response = await editUserDetails({
            variables: {
                input: {
                    onboarded: true
                }
            }
        })
        setLoading(false);
        if (response.data?.editUserDetails.errors) {
            setError(response.data.editUserDetails.errors[0].message)
        }
    }

    let username = userData.me?.username

    return (
        <Layout>
            <div className="layout flex w-[20vw] min-h-screen flex-col items-center justify-center text-center">
                <div className="mt-[-90px] w-full">
                    <h1 className="text-white mb-12">Tell us about yourself</h1>
                    <form onSubmit={undefined}>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <InputField
                                className="w-full rounded border-gray-800 bg-crumble-200 py2 px-3 text-gray-700"
                                type={"text"}
                                name="displayName"
                                placeholder="display name"
                                label="Display Name"
                                onChangeHandler={handleChange}
                            />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <div>
                                <label className="text-sm font-bold text-white">
                                    About yourself
                                </label>
                            </div>
                            <InputArea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write your throughs"
                            />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <InputField
                                className="w-full rounded border-gray-800 bg-crumble-200 py2 px-3 text-gray-700"
                                type={"text"}
                                name="bioLink"
                                placeholder="link"
                                label="Bio Link"
                                onChangeHandler={handleChange}
                            />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <div>   
                                <label className="text-sm font-bold text-white">
                                    Profile Picture
                                </label>
                            </div>
                            <Dropzone onDrop={onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <div className="
                                            border-gray-800
                                            border-[1px]
                                            bg-crumble-100
                                            p-3
                                            w-full
                                            text-center
                                            h-[70px]
                                            text-gray-400
                                            rounded-md
                                        "
                                        {...getRootProps()}
                                    >   
                                        <input {...getInputProps()}/>
                                        <div>
                                            <p>{file?.name ? file.name : "Drag 'n' drop your picture here, or click to select a file."}</p>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {error && <p className="text-superRed mt-2">{error}</p>}
                        <div className="w-full">
                            <Button variant="secondary" onClick={handleSkip} isLoading={loading} type="submit" className="mt-8 mr-4 w-[45%]">Skip</Button>
                            <Button variant="primary" onClick={handleSave} isLoading={loading} type="submit" className="mt-8 w-[45%]">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Onboarding;
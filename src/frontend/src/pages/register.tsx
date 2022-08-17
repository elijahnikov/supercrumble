import Button from "@/components/Common/Button/Button";
import InputField from "@/components/Common/InputField/InputField";
import { MeQuery, MeDocument, useMeQuery, useRegisterMutation } from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

interface RegisterProps {}

const Register = ({}: RegisterProps) => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [register] = useRegisterMutation()
    const router = useRouter()

    const {data} = useMeQuery()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleRegister = async () => {
        setLoading(true)
        const response = await register({variables: {input: inputs},
            update: (cache, {data}) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data?.register.user
                    }
                })
            }
        })
        setLoading(false)
        if (response.data?.register.errors) {
            console.log(response.data.register.errors)
            setError(response.data.register.errors[0].message)
        } else if (response.data?.register.user) {
            setError("")
            if (typeof router.query.next === "string") {
                router.push(router.query.next)
            } else {
                router.push('/')
            }
        }
    }

    return (
        <div>
            <div className="layout flex w-[20vw] min-h-screen flex-col items-center justify-center text-center">
                <div className="mt-[-90px] w-full">
                    <img
                        className="mb-5 block mx-auto pointer-events-none h-16 w-16"
                        src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                    />
                    <h1 className="text-white mb-12">Register</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <InputField
                                className="w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700"
                                type={"text"}
                                name="username"
                                placeholder="username"
                                label="Username"
                                onChangeHandler={handleChange}
                            />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <InputField
                                className="w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700"
                                type={"text"}
                                name="email"
                                placeholder="email"
                                label="E-mail"
                                onChangeHandler={handleChange}
                            />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            <InputField
                                className="w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700"
                                type={"password"}
                                name="password"
                                placeholder="password"
                                label="Password"
                                onChangeHandler={handleChange}
                            />
                        </div>
                        {error && <p className="text-superRed mt-2">{error}</p>}
                        <Button variant="primary" onClick={handleRegister} isLoading={loading} type="submit" className="mt-8 w-[100%]">Register</Button>
                    </form>
                    <div className="mt-10 text-white">
                        <p className="mb-2">
                            Already have an account?{" "}
                            <a className="text-superRed" href='/login'>Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ssr: false})(Register)
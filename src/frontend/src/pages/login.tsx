import Button from '@/components/Common/Button/Button';
import InputField from '@/components/Common/InputField/InputField';
import {
    MeDocument,
    MeQuery,
    useLoginMutation,
    useMeQuery,
} from '@/generated/graphql';
import { withApollo } from '@/utils/withApollo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface LoginProps {}

const Login = ({}: LoginProps) => {
    const [inputs, setInputs] = useState({
        usernameOrEmail: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [login] = useLoginMutation();
    const router = useRouter();

    const { data } = useMeQuery();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        setLoading(true);
        const response = await login({
            variables: inputs,
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data?.login.user,
                    },
                });
                cache.evict({ fieldName: 'posts' });
            },
        });
        setLoading(false);
        if (response.data?.login.errors) {
            console.log(response.data.login.errors);
            setError(response.data.login.errors[0].message);
        } else if (response.data?.login.user) {
            setError('');
            if (typeof router.query.next === 'string') {
                router.push(router.query.next);
            } else {
                router.push('/');
            }
        }
    };

    return (
        <div>
            <div className='layout flex min-h-screen w-[20vw] flex-col items-center justify-center text-center'>
                <div className='mt-[-90px] w-full'>
                    <img
                        className='pointer-events-none mx-auto mb-5 block h-16 w-16'
                        src='https://i.ibb.co/r4WtSVc/supercrumble800x800.png'
                    />
                    <h1 className='mb-12 text-white'>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <InputField
                                className='w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700'
                                type={'text'}
                                name='usernameOrEmail'
                                placeholder='Username/E-mail'
                                label='Username/E-mail'
                                handleChange={handleChange}
                            />
                        </div>
                        <div className='mt-8 flex flex-wrap gap-2'>
                            <InputField
                                className='w-full rounded border-gray-800 bg-crumble-200 py-2 px-3 text-gray-700'
                                type={'password'}
                                name='password'
                                placeholder='password'
                                label='Password'
                                handleChange={handleChange}
                            />
                        </div>
                        {error && <p className='mt-2 text-superRed'>{error}</p>}
                        <Button
                            variant='primary'
                            onClick={handleLogin}
                            isLoading={loading}
                            type='submit'
                            className='mt-8 w-[100%]'
                        >
                            Login
                        </Button>
                    </form>
                    <div className='mt-10 text-white'>
                        <p className='mb-2'>
                            Don't have an account?{' '}
                            <a className='text-superRed' href='/register'>
                                Register here
                            </a>
                        </p>
                        <p>
                            Forgot password?{' '}
                            <a className='texxt-superRed'>Reset password</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withApollo({ ssr: true })(Login);

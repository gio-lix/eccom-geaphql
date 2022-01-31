import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import Layout from "../../components/Layout";
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../lib/mutation";
import {router} from "next/client";
import {useRouter} from "next/router";
import {setCookie} from "nookies";



const Login = () => {
    const router = useRouter()
    const [loginUser, {loading,error, data }] = useMutation(LOGIN_USER)
    const [formatData, setFormatData] = useState<{identifier: string, password: string}>({
        identifier: '',
        password: ''
    });

    if (loading) return <h1>login in ...</h1>
    if (data) {
        console.log(data, "jwt", data.login.jwt)
        setCookie(null, 'graphqlToken', data.login.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        router.push('/')
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setFormatData({...formatData ,[e.target.name]: e.target.value} )
    }


    const submitLogin = (e: SyntheticEvent) => {
        e.preventDefault()
        loginUser({
            variables: {
                input: formatData
            }
        })
    }
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-3xl font-semibold">Acme Corporation</div>
                    <form onSubmit={submitLogin}>
                        <input
                            className="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                            name="identifier"
                            type="email"
                            value={formatData.identifier}
                            onChange={handleChange}
                            required
                            placeholder="your email"
                        />
                        <input
                            className="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                            name="password"
                            type="password"
                            value={formatData.password}
                            onChange={handleChange}
                            required
                            placeholder="password"
                        />
                        <button
                            type='submit'
                            className="inline-block mt-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                    <div className="pt-10 flex items-center justify-between">
                        <a
                            href="#1"
                            className="inline-block text-green-700 hover:text-green-900 align-baseline font-normal text-sm"
                        >
                            Forgot password?
                        </a>
                        <a href="#2" className="inline-block text-green-700 hover:text-green-900 font-normal text-sm">
                            Create an Account
                        </a>
                    </div>
                </div>
                <p className="mt-4 text-center text-gray-400 text-xs">
                    &copy;2022 Acme Corporation. All rights reserved.
                </p>
            </div>
        </Layout>
    );
};

export default Login;

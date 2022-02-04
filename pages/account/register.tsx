import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useMutation} from "@apollo/client";
import {SIGNUP_USER} from "../../lib/mutation";
import Layout from "../../components/Layout";
import {useForm} from "react-hook-form";
import {setCookie} from "nookies";
import {useRouter} from "next/router";

const Register = () => {
    const [signupUser, {loading, error, data: dataInput }] = useMutation(SIGNUP_USER)
    const router = useRouter()
    const {register, handleSubmit,reset, watch, formState: { errors }} = useForm({
        mode: 'onBlur'
    })
    if (dataInput) {
        setCookie(null, 'graphqlToken', dataInput.register.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
        router.push('/')
    }
    if (loading) return (
        <Layout>
            <h1 className='text-center mt-36 text-xl'>Signing Up ...</h1>
        </Layout>
    )
    const onSubmit = (data: any) => {
        console.log('data', data)
            signupUser({
                variables: {
                    input: data
                }
            })
        reset()
    }
    return (
        <Layout>
            {error &&  <p className='text-center mt-20'>Something went wrong</p>}
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-3xl font-semibold">Register</div>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div  className='h-16  relative flex items-end'>
                            <input
                                className="block text-gray-700 p-1 ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                                type="text"
                                {...register("username", {
                                    required: true,
                                    minLength: {
                                        value: 3,
                                        message: 'minimum length 3 characters'
                                    }
                                })}
                                placeholder="username"
                            />
                            <div  className='text-sm absolute z-20 top-1'>
                                {errors?.identifier && <p>{errors?.identifier?.message}</p>}
                            </div>
                        </div>
                        <div  className='h-16 relative flex items-end'>
                            <input
                                className="block text-gray-700 p-1  ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                                type="email"
                                {...register("email", { required: "required" })}
                                placeholder="your email"
                            />
                            <div  className='text-sm absolute top-1'>
                                {errors?.identifier && <p>{errors?.email?.message}</p>}
                            </div>
                        </div>
                        <div  className='h-16 relative flex items-end'>
                            <input
                                className="block text-gray-700 p-1 ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                                type="password"
                                {...register("password", { required: "required" })}
                                placeholder="password"
                            />
                            <div  className='text-sm absolute top-1'>
                                {errors?.identifier && <p>{errors?.password?.message}</p>}
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="inline-block mt-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="pt-10 flex items-center justify-between">
                        <a
                            href="#1"
                            className="inline-block text-green-700 hover:text-green-900 align-baseline font-normal text-sm"
                        >
                        </a>
                        <a onClick={() => router.push('/account/login')} href="#2" className="inline-block text-green-700 hover:text-green-900 font-normal text-sm">
                            I have an Account
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

export default Register;

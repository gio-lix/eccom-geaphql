import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../lib/mutation";
import Layout from "../../components/Layout";
import {useForm} from "react-hook-form";

const Register = () => {
    const [signupUser, {loading, error, data }] = useMutation(LOGIN_USER)

    const {register, handleSubmit,reset, watch, formState: { errors }} = useForm({
        mode: 'onBlur'
    })
    if (loading) return <h1>Signing Up ...</h1>
    const onSubmit = (data: any) => {
            signupUser({
                variables: {
                    input: data
                }
            })
        reset()
    }
    return (
        <Layout>
            {error &&  <p className='text-center mt-20'>Invalid identifier or password</p>}
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-3xl font-semibold">Acme Corporation</div>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div  className='h-16  relative flex items-end'>
                            <input
                                className="block text-gray-700 p-1 ml-0 w-full rounded text-lg font-normal placeholder-gray-300 outline-none"
                                type="text"
                                {...register("identifier", {
                                    required: true,
                                    minLength: {
                                        value: 5,
                                        message: 'minimum length 5 characters'
                                    }
                                })}
                                placeholder="username"
                            />
                            <div  className='text-sm absolute top-1'>
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

export default Register;

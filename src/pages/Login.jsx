import React, { useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { z } from 'zod';
import FormInput from '../components/FormInput';

function Login() {
    let isAuthenticated = false;
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center mt-4 overflow-scroll no-scrollbar'>
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5]'>
                Welcome back
            </h1>
            <p className='text-gray-400'>
                Supercharge your productivity with
                <span className='text-lime'>{' {'}
                </span>
                <span className='text-white'>{' Skills'}
                </span>
                <span className='text-lime text-3xl font-bold'>{'.'}
                </span>
                <span className='text-white'>{'log'}
                </span>
                <span className='text-lime'>{' }'}
                </span>
            </p>
            <form className='flex flex-col p-4 bg-secondary rounded-3xl mt-8 gap-5 w-[80%] max-w-[500px]'>
                <FormInput
                    title='Email'
                    labelFor='email'
                    placeholder='Enter your email'
                    type='email'
                    isRequired={true}
                    inputClassName='bg-primary/50'
                    labelClassName='ml-1'
                />
                <FormInput
                    title='Password'
                    labelFor='password'
                    placeholder='Enter your password'
                    type='password'
                    isRequired={true}
                    inputClassName='bg-primary/50'
                    labelClassName='ml-1'
                />

                <button className='w-full bg-lime/80 text-black hover:bg-lime font-semibold px-4 py-2 rounded-lg'>
                    Login
                </button>

            </form>
        </div>
    )
}

export default Login
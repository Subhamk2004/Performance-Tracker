import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { set, z } from 'zod';
import FormInput from '../components/FormInput';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../reduxSlices/UserSlice.mjs';
import InComponentLoading from '../components/InComponentLoading';


function Login() {
    let { isAuthenticated } = useSelector(state => state.user);
    let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let response = await fetch(`${serverUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            });
            let data = await response.json();
            if(data.user) {
                dispatch(authenticate(data.user));
                navigate('/dashboard');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center mt-4 overflow-scroll no-scrollbar'>
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5]'>
                Welcome back
            </h1>
            <p className='text-gray-400'>
                Supercharge your productivity with
                <span className='text-btnclr'>{' {'}
                </span>
                <span className='text-white'>{' Skills'}
                </span>
                <span className='text-btnclr text-3xl font-bold'>{'.'}
                </span>
                <span className='text-white'>{'log'}
                </span>
                <span className='text-btnclr'>{' }'}
                </span>
            </p>
            <form className='flex flex-col p-4 bg-secondary rounded-3xl mt-8 gap-5 w-[80%] max-w-[500px]'
                onSubmit={handleSubmit}
            >
                <FormInput
                    title='Email'
                    labelFor='email'
                    placeholder='Enter your email'
                    type='email'
                    isRequired={true}
                    inputClassName='bg-primary/50'
                    labelClassName='ml-1'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    title='Password'
                    labelFor='password'
                    placeholder='Enter your password'
                    type='password'
                    isRequired={true}
                    inputClassName='bg-primary/50'
                    labelClassName='ml-1'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='w-full bg-btnclr/80 text-black hover:bg-btnclr font-semibold px-4 py-2 rounded-lg'
                disabled={loading}>
                    {loading && <InComponentLoading />}
                    {!loading && 'Login'}
                </button>

            </form>
        </div>
    )
}

export default Login
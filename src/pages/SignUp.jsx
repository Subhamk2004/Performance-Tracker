import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { z } from 'zod';
import FormInput from '../components/FormInput';
import FormImageInput from '../components/FormImageInput';

function Signup() {
    let isAuthenticated = true;
    let navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);

    let initialUserState = {
        name: '',
        username: '',
        email: '',
        password: '',
        githubusername: '',
        image: null,
        primarywork: '',
        pat: ''
    }

    const [user, setUser] = useState(initialUserState);
    console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    let primaryWorkOptions = ['Academics', 'Programming', 'Research', 'Office'];
    let a;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser(prevUser => ({ ...prevUser, image: file }));
        setPreviewImage(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, []);


    return (
        <div className='w-full h-full flex flex-col items-center justify-center mt-4 overflow-scroll no-scrollbar'>
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5] flex gap-2 justify-center flex-wrap'>
                Welcome to
                <p className='text-gray-400'>
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
            <form className='flex flex-col p-4 bg-secondary rounded-3xl mt-8 gap-5 w-[80%] max-w-[500px] overflow-scroll no-scrollbar'
                onSubmit={handleSubmit}
            >

                <FormInput
                    title='Name'
                    labelFor='name'
                    placeholder='Enter your name'
                    type='text'
                    isRequired={true}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, name: prev.target.value })
                    }}
                    value={user.name}
                />
                <FormInput
                    title='Username'
                    labelFor='username'
                    placeholder='Choose a username'
                    type='text'
                    isRequired={true}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, username: prev.target.value })
                    }}
                    value={user.username}
                />
                <FormInput
                    title='Email'
                    labelFor='email'
                    placeholder='Enter your email'
                    type='email'
                    isRequired={true}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, email: prev.target.value })
                    }}
                    value={user.email}
                />
                <FormInput
                    title='Password'
                    labelFor='password'
                    placeholder='Enter your password'
                    type='password'
                    isRequired={true}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, password: prev.target.value })
                    }}
                    value={user.password}
                />
                <FormInput
                    title='Github Username'
                    labelFor='githubusername'
                    placeholder='Github Username'
                    type='text'
                    isRequired={false}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, githubusername: prev.target.value })
                    }}
                    value={user.githubusername}
                />
                {
                    user.githubusername &&
                    <FormInput
                        title='Github Personal Access Token'
                        labelFor='pat'
                        placeholder='Github PAT'
                        type='text'
                        isRequired={false}
                        inputClassName='bg-primary/50 text-black'
                        labelClassName='ml-1'
                        onChange={(prev) => {
                            setUser({ ...prev, pat: prev.target.value })
                        }}
                        value={user.pat}
                        alertText="This is required to fetch your private repositories. Rest assured, your token will be encrypted and never disclosed"
                    />
                }
                <FormInput
                    title='Primary Work'
                    labelFor='primarywork'
                    placeholder='primary work'
                    type='text'
                    isSelect={true}
                    selectOptions={primaryWorkOptions}
                    isRequired={false}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(prev) => {
                        setUser({ ...prev, primarywork: prev.target.value })
                    }}
                    value={user.primarywork}
                />

                <FormImageInput
                    title='User Profile Avatar'
                    labelFor='profilePic'
                    isRequired={false}
                    onChange={handleImageChange}
                    previewImage={previewImage}
                />
                <button className='w-full bg-lime/80 text-black hover:bg-lime font-semibold px-4 py-2 rounded-lg'>
                    Signup
                </button>

            </form>
        </div>
    )
}

export default Signup
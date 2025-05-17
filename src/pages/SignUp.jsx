import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { set, z } from 'zod';
import FormInput from '../components/FormInput';
import FormImageInput from '../components/FormImageInput';
import { useSelector } from 'react-redux';
import IncomponentLoading from '../components/InComponentLoading';
import CustomAlert from '../components/AlertBox';

function Signup() {
    let { isAuthenticated } = useSelector(state => state.user);
    let navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    let [loading, setLoading] = useState(false);
    let [alert, setAlert] = useState(null);
    let [alertType, setAlertType] = useState('success');

    let initialUserState = {
        name: '',
        username: '',
        email: '',
        password: '',
        githubusername: '',
        image: null,
        primarywork: '',
        pat: '',
        institute: ''
    }

    const [user, setUser] = useState(initialUserState);
    const serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;
    let primaryWorkOptions = ['Academics', 'Programming', 'Research', 'Office'];

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            if (key === 'image') {
                formData.append('image', user.image);
            } else {
                formData.append(key, user[key]);
            }
        });
        try {
            setLoading(true);
            let response = await fetch(`${serverUrl}/api/signup`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            if (data.isSaved) {
                setAlert('User registered successfully');
                setAlertType('success');
                setTimeout(() => {
                    setAlert(null);
                    navigate('/login');
                }, 7000);
            }
            else {
                if (data.error) {
                    setAlert(data.error);
                }
                else {
                    setAlert(data.message);
                }
                setAlertType('error');
                setTimeout(() => {
                    setAlert(null);
                }, 7000);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser(prev => ({ ...prev, image: file }));
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center mt-4 overflow-scroll no-scrollbar'>
            {
                alert && <CustomAlert alertType={alertType} alertMessage={alert} />
            }
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5] flex gap-2 justify-center flex-wrap'>
                Welcome to
                <p className='text-gray-400'>
                    <span className='text-btnclr'>{' {'}</span>
                    <span className='text-white'>{' Skills'}</span>
                    <span className='text-btnclr text-3xl font-bold'>{'.'}</span>
                    <span className='text-white'>{'log'}</span>
                    <span className='text-btnclr'>{' }'}</span>
                </p>
            </h1>
            <p className='text-gray-400'>
                Supercharge your productivity with
                <span className='text-btnclr'>{' {'}</span>
                <span className='text-white'>{' Skills'}</span>
                <span className='text-btnclr text-3xl font-bold'>{'.'}</span>
                <span className='text-white'>{'log'}</span>
                <span className='text-btnclr'>{' }'}</span>
            </p>
            <form className='flex flex-col p-4 bg-secondary rounded-3xl mt-8 gap-5 w-[80%] max-w-[500px] overflow-scroll no-scrollbar'
                onSubmit={handleSubmit}>

                <FormInput
                    title='Name'
                    labelFor='name'
                    placeholder='Enter your name'
                    type='text'
                    isRequired={true}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
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
                    onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
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
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
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
                    onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
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
                    onChange={(e) => setUser(prev => ({ ...prev, githubusername: e.target.value }))}
                    value={user.githubusername}
                />
                {user.githubusername && (
                    <FormInput
                        title='Github Personal Access Token'
                        labelFor='pat'
                        placeholder='Github PAT'
                        type='text'
                        isRequired={false}
                        inputClassName='bg-primary/50 text-black'
                        labelClassName='ml-1'
                        onChange={(e) => setUser(prev => ({ ...prev, pat: e.target.value }))}
                        value={user.pat}
                        alertText="This is required to fetch your private repositories. Rest assured, your token will be encrypted and never disclosed"
                    />
                )}
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
                    onChange={(e) => setUser(prev => ({ ...prev, primarywork: e.target.value }))}
                    value={user.primarywork}
                />
                <FormInput
                    title='Institute'
                    labelFor='institute'
                    placeholder='Your current institute or company...'
                    type='text'
                    isRequired={false}
                    inputClassName='bg-primary/50 text-black'
                    labelClassName='ml-1'
                    onChange={(e) => setUser(prev => ({ ...prev, institute: e.target.value }))}
                    value={user.institute}
                />

                <FormImageInput
                    title='User Profile Avatar'
                    labelFor='profilePic'
                    isRequired={false}
                    onChange={handleImageChange}
                    previewImage={previewImage}
                />
                <button className='w-full bg-btnclr/80 text-black hover:bg-btnclr font-semibold px-4 py-2 rounded-lg'
                    disabled={loading}>
                    {
                        loading ? <IncomponentLoading isShort={true} /> : 'Signup'
                    }
                </button>
            </form>
        </div>
    )
}

export default Signup
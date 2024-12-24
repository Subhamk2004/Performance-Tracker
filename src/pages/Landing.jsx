import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard';
import { BarChartBig, Book, Code2, Github, TimerIcon, Users } from 'lucide-react';


function Landing() {
    let isAuthenticated = true;
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-center justify-start mt-4 overflow-scroll no-scrollbar'>
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5]'>
                Track your learning journey with us 🚀
            </h1>
            <div className='flex flex-row gap-4 md:gap-10 mt-8'>
                <button className='bg-lime text-black font-semibold px-4 py-2 rounded-lg'>
                    <Link to='/login'>
                        Get Started
                    </Link>
                </button>
                <button className='bg-secondary text-white font-semibold px-4 py-2 rounded-lg'>
                    <Link to='/about'>
                        Learn More
                    </Link>
                </button>
            </div>
            <hr className='w-full mt-16 max-w-[1100px]' />
            <div className='w-full flex flex-col items-center justify-center mt-8 md:mt-14'>
                <h2 className='font-semibold text-3xl'>Features</h2>
                <div className='w-full flex flex-row flex-wrap gap-4 md:gap-8 mt-8 justify-center'>
                    <FeatureCard
                        title='Progress Tracking'
                        description='Monitor your learning progress with detailed analytics and insights'
                        icon={BarChartBig}
                    />
                    <FeatureCard
                        title='Study Sessions'
                        description='Time-tracked focused study sessions with built-in pomodoro timer'
                        icon={TimerIcon}
                    />
                    <FeatureCard
                        title="Github Integration"
                        description="Sync your Github repositories and track your coding progress"
                        icon={Github}
                    />
                    <FeatureCard
                        title="Friend Activity"
                        description="View your friends' progress and motivate each other"
                        icon={Users}
                    />
                    <FeatureCard
                        title="Quick Notes"
                        description="Take quick notes and access them anytime, anywhere"
                        icon={Book}
                    />
                    <FeatureCard
                        title="Task Management"
                        description="Manage your tasks and deadlines with ease"
                        icon={Code2}
                    />
                </div>

            </div>
            <h1 className='text-4xl font-semibold text-white text-center leading-[1.5] mt-16'>
                Ready to start tracking?
            </h1>
            <p className='text-gray-400 text-sm'>
                Join us now and start managing your work efficiently
            </p>
            <button className='bg-lime text-black font-semibold px-4 py-2 rounded-lg mt-4'>
                <Link to='/signup'>
                    Signup
                </Link>
            </button>
        </div>
    )
}

export default Landing
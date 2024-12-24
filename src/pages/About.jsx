import React from 'react';
import FeatureCard from '../components/FeatureCard';

const AboutUs = () => {
    return (
        <div className="overflow-scroll no-scrollbar bg-[#050508] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 ">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-6">Tracking Excellence, Inspiring Growth</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Your all-in-one platform for personal development, academic excellence, and professional growth tracking.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-[#111525] rounded-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold mb-4 text-[#b2ea37]">Our Mission</h2>
                    <p className="text-gray-300">
                        We believe in empowering individuals to reach their full potential through systematic tracking,
                        intelligent goal-setting, and collaborative growth. Our platform combines cutting-edge technology
                        with practical functionality to create a seamless performance tracking experience.
                    </p>
                </div>


                {/* Developer Section */}
                <div className="bg-[#111525] rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-[#b2ea37]">Meet the Developer</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        
                        <div>
                            <h3 className="text-xl font-bold mb-2">Subham Rahar</h3>
                            <p className="text-gray-300 mb-4">
                                Full Stack Developer
                            </p>
                            <p className="text-gray-300">
                                Passionate about creating tools that help people track, measure, and improve their performance
                                across different aspects of life. This platform is built with MERN stack and focuses on
                                providing a seamless, intuitive experience for users to manage their growth journey.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AboutUs;
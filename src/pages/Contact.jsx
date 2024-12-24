import React, { useState } from 'react';
import { Github, Linkedin, Mail, Send, MessageSquare } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className=" bg-[#050508] text-white py-16 px-4 overflow-scroll no-scrollbar w-full">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions about the platform? Want to share feedback? We'd love to hear from you.
                    </p>
                </div>

                <div className="flex w-full flex-row flex-wrap gap-12 justify-center">
                    {/* Contact Information */}
                    <div className="lg:w-[40%] flex flex-col gap-12 flex-wrap ">
                        <div className="bg-[#111525] p-8 rounded-lg w-full min-w-[350px]">
                            <h2 className="text-2xl font-bold mb-6 text-[#b2ea37]">Connect With Us</h2>

                            {/* Social Links */}
                            <div className="space-y-6">
                                <a
                                    href="mailto:subhamrahar22@gmail.com"
                                    className="flex items-center gap-4 text-gray-300 hover:text-[#b2ea37] transition-colors"
                                >
                                    <Mail size={24} />
                                    <span>subhamrahar22@gmail.com</span>
                                </a>

                                <a
                                    href="https://github.com/Subhamk2004"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-gray-300 hover:text-[#b2ea37] transition-colors"
                                >
                                    <Github size={24} />
                                    <span>Subhamk2004</span>
                                </a>

                                <a
                                    href="https://linkedin.com/in/subham-kumar-73b98b252"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-gray-300 hover:text-[#b2ea37] transition-colors"
                                >
                                    <Linkedin size={24} />
                                    <span>Subham Kumar</span>
                                </a>
                            </div>
                        </div>

                        {/* Quick Response Card */}
                        <div className="bg-[#111525] p-8 rounded-lg w-full min-w-[350px]">
                            <h2 className="text-2xl font-bold mb-4 text-[#b2ea37]">Quick Response</h2>
                            <p className="text-gray-300">
                                We typically respond within 24 hours during business days. For urgent matters,
                                please reach out via email or LinkedIn message.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#111525] p-8 rounded-lg lg:w-1/2 ">
                        <h2 className="text-2xl font-bold mb-6 text-[#b2ea37]">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-[#050508] border border-gray-700 text-white focus:outline-none focus:border-[#4151d8]"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-[#050508] border border-gray-700 text-white focus:outline-none focus:border-[#4151d8]"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-[#050508] border border-gray-700 text-white focus:outline-none focus:border-[#4151d8]"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full p-3 rounded-lg bg-[#050508] border border-gray-700 text-white focus:outline-none focus:border-[#4151d8]"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4151d8] hover:bg-[#4151d8]/90 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { Info, LogOutIcon, UserPlus2, Phone, Menu, X } from 'lucide-react'

function GuestNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    let activeLink = 'flex flex-row items-center gap-4 text-white text-[20px] px-6 p-3 font-semibold cursor-pointer bg-secondary hover:text-white rounded-2xl transition-all'
    let inactiveLink = 'flex flex-row items-center gap-4 text-darkGray text-[20px] px-6 p-3 font-bold cursor-pointer bg-primary hover:text-white hover:bg-secondary hover:rounded-2xl transition-all'

    const navLinks = [
        { to: "/login", icon: <LogOutIcon size='26' />, text: "Login" },
        { to: "/signup", icon: <UserPlus2 size='26' />, text: "Signup" },
        { to: "/about", icon: <Info size='26' />, text: "About" },
        { to: "/contact", icon: <Phone size='26' />, text: "Contact Us" }
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-secondary text-white sm:hidden"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`fixed sm:relative h-full w-[280px] sm:w-1/5 min-w-[230px] max-w-[280px] bg-primary rounded-r-3xl sm:rounded-3xl overflow-scroll no-scrollbar flex flex-col items-center justify-between px-2 transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-[100%] sm:translate-x-0'
                }`}>
                <div className='flex flex-col w-full items-center gap-8'>
                    <Link to='/' className='mt-8 sm:-mt-7 flex flex-row items-center'>
                        <img src={Logo} alt="Logo" />
                    </Link>
                    <div className='flex w-full flex-col gap-3'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => isActive ? activeLink : inactiveLink}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon}
                                {link.text}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default GuestNavbar
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import ProfileCardNav from './ProfileCardNav'
import { Info, LayoutDashboard, LogOutIcon, LucideArrowRightFromLine, LucideLogIn, Phone, UserPlus2 } from 'lucide-react'

function GuestNavbar() {

    let activeLink = 'flex flex-row items-center gap-4 text-white text-[20px] px-6 p-3 font-semibold cursor-pointer bg-secondary hover:text-white rounded-2xl transition-all'

    let inactiveLink = 'flex flex-row items-center gap-4 text-darkGray text-[20px] px-6 p-3 font-bold cursor-pointer bg-primary hover:text-white hover:bg-secondary hover:rounded-2xl transition-all'


    return (
        <nav className='h-full w-1/5 min-w-[230px] max-w-[280px] rounded-3xl overflow-scroll no-scrollbar flex flex-col items-center justify-between px-2'>
            <div className='flex flex-col w-full items-center gap-8'>
                <Link to='/' className='-mt-7 flex flex-row items-center'>
                    <img src={Logo} />
                </Link>
                <div className='flex w-full flex-col gap-3'>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        <LogOutIcon size='26' />
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        <UserPlus2 size='26' />
                        Signup
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        <Info size='26' />
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        <Phone size='26' />
                        Contact Us
                    </NavLink>
                </div>
            </div>

            <ProfileCardNav name='Subham' institute='Developer' />
        </nav>
    )
}

export default GuestNavbar
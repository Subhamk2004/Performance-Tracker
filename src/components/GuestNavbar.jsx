import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import ProfileCardNav from './ProfileCardNav'
import { LayoutDashboard } from 'lucide-react'

function GuestNavbar() {

    let activeLink = 'flex flex-row items-center gap-4 text-white px-4 font-bold cursor-pointer bg-primary hover:text-white hover:bg-secondary hover:rounded-lg hover:text-[20px] transition-all'

    let inactiveLink = 'text-textp font-semibold cursor-pointer hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[18px] transition-all'



    return (
        <nav className='h-full border w-1/5 min-w-[230px] max-w-[280px] rounded-3xl overflow-scroll no-scrollbar flex flex-col items-center justify-between p-2'>
            <div className='flex flex-col w-full items-center'>
                <Link to='/' className='flex flex-row items-center'>
                    <img src={Logo} />
                </Link>
                <div className='flex w-full flex-col gap-3'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        <LayoutDashboard size='26' />
                        Home
                    </NavLink>
                    <NavLink
                        to="/allDoctors"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        All Doctors
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        About
                    </NavLink>
                </div>
            </div>

            <ProfileCardNav />
        </nav>
    )
}

export default GuestNavbar
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.png'

function Navbar() {

  let activeLink = 'text-primary font-bold cursor-pointer bg-white hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[20px] transition-all'

  let inactiveLink = 'text-textp font-semibold cursor-pointer hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[18px] transition-all'



  return (
    <nav className='h-full border w-1/5 min-w-[220px] max-w-[300px] rounded-3xl overflow-scroll no-scrollbar flex flex-col items-center justify-between p-1'>
      <Link to='/' className='flex flex-row items-center'>
        <img src={Logo} />
      </Link>
      <div className='border flex flex-col'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeLink : inactiveLink
          }>
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
    </nav>
  )
}

export default Navbar
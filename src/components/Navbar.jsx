import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import ProfileCardNav from './ProfileCardNav'
import { CalendarCheck2, CalendarPlus, CopyPlusIcon, Focus, HistoryIcon, Info, LayoutDashboard, LayoutGrid, LayoutGridIcon, LogOutIcon, LucideArrowRightFromLine, LucideLogIn, LucideNotebookPen, LucideTimer, LucideUsers, NotebookPenIcon, Phone, StickyNote, TouchpadOffIcon, UserPlus2 } from 'lucide-react'

function Navbar() {

  let activeLink = 'flex flex-row items-center gap-4 text-white text-[20px] px-6 p-3 font-semibold cursor-pointer bg-secondary hover:text-white rounded-2xl transition-all'

  let inactiveLink = 'flex flex-row items-center gap-4 text-darkGray text-[20px] px-6 p-3 cursor-pointer bg-primary hover:text-white hover:bg-secondary hover:rounded-2xl transition-all'


  return (
    <nav className='h-full w-1/5 min-w-[230px] max-w-[280px] rounded-3xl overflow-scroll no-scrollbar flex flex-col items-center justify-between px-2'>
      <div className='flex flex-col w-full items-center gap-8'>
        <Link to='/dashboard' className='-mt-7 flex flex-row items-center'>
          <img src={Logo} />
        </Link>
        <div className='flex w-full flex-col gap-3'>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <LayoutDashboard size='26' />
            Dashboard
          </NavLink>
          <NavLink
            to="/addtask"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <CopyPlusIcon size='26' />
            Add Task
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <CalendarCheck2 size='26' />
            History
          </NavLink>
          <NavLink
            to="/pending"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <HistoryIcon size='26' />
            Pending Task
          </NavLink>
          <NavLink
            to="/zenspace"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <Focus size='26' />
            Zen Space
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <NotebookPenIcon size='26' />
            Quick notes
          </NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            <LucideUsers size='26' />
            Friends
          </NavLink>
        </div>
      </div>

      <ProfileCardNav name='Subham' />
    </nav>
  )
}

export default Navbar
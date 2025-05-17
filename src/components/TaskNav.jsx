import React from 'react'
import { NavLink } from 'react-router-dom'

function TaskNav() {

    const activeLink = "text-white font-bold md:w-full flex flex-row gap-3 items-center text-[19px] lg:text-[22px] w-auto cursor-pointer bg-primary px-4 py-3 rounded-2xl transition-all whitespace-nowrap border"

    // Inactive Link
    const inactiveLink = "text-white flex flex-row items-center text-[19px] gap-3 w-auto md:w-full px-4 py-3 rounded-2xl font-semibold cursor-pointer bg-primary/60 hover:bg-primary hover:rounded-2xl hover:text-[20px] transition-all whitespace-nowrap"
    return (
        <div className='w-full md:min-w-[250px] p-3 mt-3'>
            <ul className='w-full overflow-scroll no-scrollbar flex gap-4 bg-secondary rounded-2xl p-3 py-5 shadow-xl shadow-black'>
                <NavLink
                    to="/alltask"
                    className={({ isActive }) =>
                        isActive ? activeLink : inactiveLink
                    }>
                    All Tasks
                </NavLink>
                <NavLink
                    to="/active"
                    className={({ isActive }) =>
                        isActive ? activeLink : inactiveLink
                    }>
                    Active Tasks
                </NavLink>
                <NavLink
                    to="/completed"
                    className={({ isActive }) =>
                        isActive ? activeLink : inactiveLink
                    }>
                    Completed Tasks
                </NavLink>
                <NavLink
                    to="/pending"
                    className={({ isActive }) =>
                        isActive ? activeLink : inactiveLink
                    }>
                    Pending Tasks
                </NavLink>
            </ul>
        </div>
    )
}

export default TaskNav
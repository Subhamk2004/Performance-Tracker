import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ActiveTaskCard from '../components/ActiveTaskCard';
import { Link, NavLink } from 'react-router-dom';

function AllTasks() {
    let { tasks } = useSelector(state => state.tasks)
    const activeLink = "text-primary font-bold md:w-full flex flex-row gap-3 items-center text-[19px] lg:text-[22px] w-auto cursor-pointer bg-white px-4 py-3 shadow-md shadow-darkGray rounded-2xl hover:text-primary transition-all hover:shadow-[#9f9fe9] whitespace-nowrap "

    // Inactive Link
    const inactiveLink = "text-textp flex flex-row items-center text-[17px] md:text-[19px] lg:text-[21px] gap-3 w-auto md:w-full px-4 py-3 rounded-2xl font-semibold cursor-pointer hover:text-black hover:bg-white hover:rounded-2xl hover:px-2 hover:text-[20px] transition-all hover:shadow-[#9f9fe9] hover:shadow-md border whitespace-nowrap "


    useEffect(() => {
        console.log('Tasks:', tasks);
    }, [tasks]);
    return (
        <div className='w-full h-full flex flex-col items-center justify-start overflow-scroll no-scrollbar'>
            <div className='w-full md:w-[30%] md:min-w-[250px] md:max-w-[400px] p-3  mt-3'>
                <ul className='w-full overflow-scroll no-scrollbar md:overflow-auto flex md:flex-col gap-4 bg-white rounded-2xl p-3 py-5 shadow-lg shadow-darkGray'>
                    <NavLink
                        to="/alldoctors/General Physician"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        General Physician
                    </NavLink>
                    <NavLink
                        to="/allDoctors/Neurologist"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        Neurologist
                    </NavLink>
                    <NavLink
                        to="/allDoctors/Gynecologist"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        Gynecologist
                    </NavLink>
                    <NavLink
                        to="/allDoctors/Pediatricians"
                        className={({ isActive }) =>
                            isActive ? activeLink : inactiveLink
                        }>
                        Pediatricians
                    </NavLink>
                </ul>
            </div>
            <div className='w-full flex flex-col items-center justify-start gap-4 mt-4 bg-secondary p-4 rounded-3xl'>

                {
                    tasks?.length > 0 ?
                        tasks.map((task, index) => {
                            return <ActiveTaskCard key={index} task={task} isDashboard={false} />
                        }) :
                        <h1 className="text-white text-2xl">No tasks found</h1>
                }
            </div>
        </div>
    )
}

export default AllTasks
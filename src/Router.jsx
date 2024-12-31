import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import GuestNavbar from "./components/GuestNavbar";
import { useSelector } from "react-redux";
import useAuth from "./hooks/useAuth.mjs";
import useTasks from "./hooks/useTasks.mjs";


function Router() {
    const { isLoading, error, authData } = useAuth();
    const { tasks, loading, error: taskError } = useTasks();
    let { isAuthenticated } = useSelector(state => state.user);
    useEffect(() => {
        console.log('Auth data:', authData, 'isAuthenticated:', isAuthenticated);
    }, [authData]);


    return (
        <div className="w-full h-full flex flex-row gap-14 px-4 py-10 text-white">
            {
                !isAuthenticated ?
                    <GuestNavbar /> :
                    <Navbar />
            }
            <Outlet />
        </div>
    )
}

export default Router;
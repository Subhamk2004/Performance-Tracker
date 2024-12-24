import React from "react";
import { Outlet } from "react-router-dom";
// import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import GuestNavbar from "./components/GuestNavbar";


function Router() {
    let isAuthenticated = true;
    return (
        <div className="w-full h-full flex flex-row gap-6 px-4 py-10 text-white">
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
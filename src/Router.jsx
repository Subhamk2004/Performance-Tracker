import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import GuestNavbar from "./components/GuestNavbar";
import { useSelector } from "react-redux";
import useAuth from "./hooks/useAuth.mjs";
import useTasks from "./hooks/useTasks.mjs";
import useNotes from "./hooks/useNotes.mjs";
import AI from "./components/AI";
import { Stars } from "lucide-react";


function Router() {
    const { isLoading, error, authData } = useAuth();
    const { notes } = useNotes();
    let [showChatBot, setShowChatBot] = useState(false);
    const { tasks, loading, error: taskError, dailyActivity } = useTasks();
    let navigate = useNavigate();
    let { isAuthenticated } = useSelector(state => state.user);
    useEffect(() => {
    }, [authData, tasks, dailyActivity, loading, error, taskError, notes]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);


    return (
        <div className="w-full h-full flex flex-col sm:flex-row gap-14 px-4 py-10 text-white relative">
            {
                !isAuthenticated ?
                    <GuestNavbar /> :
                    <Navbar />
            }
            <Outlet />
            <div className="z-10 fixed right-3 bottom-12 md:right-12 shadow-lg shadow-[black] rounded-full group cursor-pointer flex justify-center items-center bg-secondary border">
                {
                    showChatBot ?
                        null :
                        <p className="text-sm md:text-base absolute bottom-full mb-2 text-white right-0 bg-secondary p-4 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out w-[320px] md:w-[350px] gap-1 inline-block">
                            👋 Hi there! I'm <span className='text-btnclr font-semibold'>Skills.log' AI assistant</span>, Need help with anything? ready to help!
                        </p>
                }
                <button className="p-3" onClick={() => {
                    setShowChatBot(!showChatBot)
                }}>
                    <Stars size={25} className="" />
                </button>
            </div>
            {
                showChatBot &&
                <div className="fixed bottom-32 max-h-[600px] right-[15px] md:right-10 w-[375px] md:w-auto md:max-w-[480px] lg:max-w-[700px] md:h-[600px] lg:h-[600px] bg-secondary shadow-lg shadow-[black] rounded-3xl z-20 overflow-scroll no-scrollbar">
                    <AI />
                </div>
            }
        </div>
    )
}

export default Router;
import React, { useState } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import RandomColorGenerator from '../utils/RandomColorGenerator.mjs';
import { logout } from '../reduxSlices/UserSlice.mjs';
import { Navigate, useNavigate } from 'react-router-dom';

function ProfileCardNav() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const color = RandomColorGenerator();
    const { image, name, institute } = useSelector(state => state.user);
    let serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;
    let navigate = useNavigate();

    const handleLogout = async() => {
        try {
            
            let response = await fetch(`${serverUrl}/api/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            let data = await response.json();
            console.log(data);
            if(data.success){
                dispatch(logout());
                navigate('/')
            }
            else{

            }
            
                
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="relative">
            <div className="w-full flex flex-row border-2 p-2 border-secondary rounded-2xl items-center justify-between bg-secondary shadow-lg shadow-[#000000] mb-4">
                <div className="flex flex-row items-center gap-3">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg shadow-black">
                        {image === "null" ? (
                            <div className="w-full bg-primary flex justify-center relative items-center h-full">
                                <div
                                    className="opacity-45"
                                    style={{
                                        backgroundColor: `#${color}`,
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                />
                                <p className="absolute text-3xl font-semibold">
                                    {name[0]?.toUpperCase()}
                                </p>
                            </div>
                        ) : (
                            <img
                                src={image}
                                alt={`${name}`}
                                className="object-cover w-full h-full rounded-full shadow-2xl shadow-black"
                            />
                        )}
                    </div>
                    <div className="flex flex-col text-base">
                        <p>{name}</p>
                        <p>{institute}</p>
                    </div>
                </div>
                <button
                    className="p-1 rounded-full bg-secondary flex items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ChevronDown size="20" className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg shadow-black z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-primary/20 rounded-lg transition-colors duration-200"
                    >
                        <LogOut size="16" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileCardNav;
import { CheckCircle2, Info, X } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react'
// import useAuth from '../hooks/useAuth'

function AlertDisplay({
    alertMessage = 'Something went wrong, try refreshing the page', alertType = 'warning' }) {
    // const { error } = useAuth();
    // let error = '';
    
    let startStyle = 'transition-all h-full w-[5px]';
    let stopStyle = 'transition-all duration-[4500ms] ease-in w-[5px] h-[0px]'
    let alertBoxShowStyle = 'transition-all  border   rounded-xl relative flex flex-row overflow-hidden w-full h-full visible'
    let alertBoxHideStyle = 'transition-all delay-[4500ms] duration-[1500ms] ease-in-out w-0  border rounded-xl relative flex flex-row overflow-hidden border-0 '
    let [alertIndicator, setAlertIndicator] = useState(alertType);
    let [style, setStyle] = useState(startStyle);
    let [alertStyle, setAlertStyle] = useState(alertBoxShowStyle);

    useEffect(() => {
        setAlertStyle(alertBoxShowStyle)
        setStyle(startStyle);
        setAlertIndicator(alertType)
        if (alertType !== 'error') {
            setTimeout(() => {
                setAlertStyle(alertBoxHideStyle)
                setStyle(stopStyle);
                setTimeout(() => {
                    setAlertIndicator('');
                }, 7000)
            }, 500)
        }

    }, [alertType])


    // if (error) {
    //     return (
    //         <div className='w-screen h-screen fixed z-40 inset-0 bg-white flex flex-col items-center justify-center gap-5'>
    //             <h1 className='text-xl md:text-4xl font-extrabold text-textp flex flex-row gap-2'>
    //                 Sorry <span className='text-[#ec174d]'> Error </span>  from the Server  Side !!!!
    //             </h1>
    //             <video
    //                 autoPlay
    //                 muted
    //                 loop
    //                 playsInline
    //                 style={{}}>
    //                 <source src={serverError} type="video/webm" />
    //                 Your browser does not support the video tag.
    //             </video>
    //             <div className='flex flex-row gap-1 items-center'>
    //                 <img src={warning} className='w-[15px] h-[15px] md:w-[25px] md:h-[25px]' />
    //                 <p className='text-textp text-sm md:text-base '>Try again after sometime</p>
    //             </div>
    //         </div>
    //     )
    // }
    return (
        <div className='p-3  flex flex-row justify-center fixed z-40'>
            {
                alertIndicator === "success" ?
                    <div className='min-w-[250px] flex flex-col max-w-[350px] relative '>
                        <div className={`${alertStyle} bg-green-100 border-green-400 text-green-700`} role='alert'>
                            <div className={`${style} bg-green-400`}></div>
                            <div className='px-4 py-3 flex flex-col'>
                                <div className='flex flex-row items-center gap-1'>
                                    <CheckCircle2 size='24' className='text-green-700' />
                                    <strong className='text-lg font-bold'>Success!</strong>
                                </div>
                                <span className='block text-base  sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#7fe66a57] hover:bg-[#6ec75c93] rounded-full '
                            >
                                <X size={24} className='text-gray-600 rounded-full p-1' />
                            </button>
                        </div>
                    </div> :
                    null
            }
            {
                alertIndicator === "warning" ?
                    <div className=' md:min-w-[250px] flex flex-col max-w-[350px] relative '>
                        <div className={`${alertStyle} bg-yellow-100 border-yellow-400 text-yellow-700`} role='alert'>
                            <div className={`${style} bg-yellow-400`}></div>
                            <div className='px-4 py-3 flex flex-col'>
                                <div className='flex flex-row items-center gap-1'>
                                    <Info size='22' className='text-yellow-700' />
                                    <strong className='text-lg font-bold'>Warning!</strong>
                                </div>
                                <span className='block text-base sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#e6c56a57] hover:bg-[#c7c05c93] rounded-full'
                            >
                                <X size={24} className='text-gray-600 rounded-full p-1' />
                            </button>
                        </div>
                    </div> :
                    null
            }
            {
                alertIndicator === "error" ?
                    <div className='min-w-[250px] flex flex-col max-w-[350px] relative'>
                        <div className={`${alertStyle} bg-red-100 border-red-400 text-red-700 `} role='alert'>
                            <div className={`${style} bg-red-400`}></div>
                            <div className='px-4 py-3 flex flex-col '>
                                <div className='flex flex-row items-center gap-1'>
                                    <Info size='20' className='text-red-700' />
                                    <strong className='text-lg font-bold'>Error!</strong>
                                </div>
                                <span className='block text-base sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#e66a6a57] hover:bg-[#c75c5c93] rounded-full'
                            >
                                <X size={24} className='text-gray-600 rounded-full p-1' />
                            </button>
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default AlertDisplay
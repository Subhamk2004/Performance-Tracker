import React from 'react'
import { ChevronDown, User } from 'lucide-react'
import batman from '../assets/batman.jpg'

function ProfileCardNav({
    name = "Subham",
    institute = "Institute Name",
    image
}) {
    return (
        <div className='w-full flex flex-row border-2 p-2 border-secondary rounded-2xl items-center justify-between bg-secondary shadow-lg shadow-[#000000] mb-4'>
            <div className='flex flex-row items-center gap-3'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg shadow-black'>
                    <img src={batman} className='object-cover
                     w-full h-full rounded-full shadow-2xl shadow-black'/>
                </div>
                <div className='flex flex-col text-base'>
                    <p>{name}</p>
                    <p>{institute}</p>
                </div>
            </div>
            <button className='p-1 rounded-full bg-secondary flex items-center justify-center'>
                <ChevronDown size='20' />
            </button>
        </div>
    )
}

export default ProfileCardNav
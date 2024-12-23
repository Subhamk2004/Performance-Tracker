import React from 'react'
import { ChevronDown, User } from 'lucide-react'

function ProfileCardNav() {
    return (
        <div className='w-full flex flex-row border-2 p-2 border-white rounded-2xl items-center justify-between'>
            <div className='flex flex-row items-center gap-3'>
                <div>
                    <User size='40' className='rounded-full' />
                </div>
                <div className='flex flex-col text-base'>
                    <p>Subham</p>
                    <p>Institute Name</p>
                </div>
            </div>
            <button className='p-1 rounded-full bg-secondary flex items-center justify-center'>
                <ChevronDown size='20' />
            </button>
        </div>
    )
}

export default ProfileCardNav
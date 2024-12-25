import React from 'react'
import { ChevronDown, User } from 'lucide-react'
import batman from '../assets/batman.jpg'
import { useSelector } from 'react-redux'
import RandomColorGenerator from '../utils/RandomColorGenerator.mjs'

function ProfileCardNav() {
    const color = RandomColorGenerator()
    const { image, name, institute } = useSelector(state => state.user)
    
    return (
        <div className='w-full flex flex-row border-2 p-2 border-secondary rounded-2xl items-center justify-between bg-secondary shadow-lg shadow-[#000000] mb-4'>
            <div className='flex flex-row items-center gap-3'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg shadow-black'>
                    {
                        image === "null" ?
                            <div className="w-full bg-primary flex justify-center relative items-center h-full">
                                <div
                                    className=' opacity-45'
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
                                >
                                </div>
                                <p className='absolute text-3xl font-semibold'>
                                    {name[0]?.toUpperCase()}
                                </p>
                            </div>
                            :
                            (
                                <img
                                    src={image}
                                    alt={`${name}`}
                                    className="object-cover
                     w-full h-full rounded-full shadow-2xl shadow-black"
                                />
                            )
                    }
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
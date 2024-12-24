import React, { useState } from 'react'

function Dashboard() {

  let [tasks, setTasks] = useState([])

  return (
    <div className='w-full h-full flex flex-col justify-start mt-4 overflow-scroll no-scrollbar'>
      <h1 className='text-3xl font-semibold text-white leading-[1.5]'>
        Welcome, Subham!
      </h1>
      <div>
        
      </div>
    </div>
  )
}

export default Dashboard
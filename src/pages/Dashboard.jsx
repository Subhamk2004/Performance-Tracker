import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard'
import batman from '../assets/batman.jpg'
import { FileStackIcon, Github, HistoryIcon, SearchIcon, SquareStackIcon } from 'lucide-react'
import ActiveTaskCard from '../components/ActiveTaskCard'
import StreakCard from '../components/StreakCard'
import DashboardBtn from '../components/DashboardBtn'
import getGithubRepos from '../hooks/getGithubRepos'

function Dashboard() {

  let { repos } = getGithubRepos();
  let [tasks, setTasks] = useState([
    {
      title: 'Complete the frontend of the project',
      description: 'Complete the frontend of the project by 5th July',
      status: 'pending',
      id: 1,
      created_at: '2024-06-17T12:36:04Z',
      toBeDoneBy: '2024-06-17T12:36:04Z',
      priority: 'high'
    },
    {
      title: 'Complete the backend of the project',
      description: 'Complete the backend of the project by 10th July',
      status: 'pending',
      id: 2,
      created_at: '2024-06-17T12:36:04Z',
      toBeDoneBy: '2024-06-17T12:36:04Z',
      priority: 'low'
    },
    {
      title: 'Complete the testing of the project',
      description: 'Complete the testing of the project by 15th July',
      status: 'pending',
      id: 3,
      created_at: '2024-06-17T12:36:04Z',
      toBeDoneBy: '2024-06-17T12:36:04Z',
      priority: 'medium'
    },
    {
      title: 'Complete the documentation of the project',
      description: 'Complete the documentation of the project by 20th July',
      status: 'pending',
      id: 4,
      created_at: '2024-06-17T12:36:04Z',
      toBeDoneBy: '2024-06-17T12:36:04Z',
      priority: 'high'
    }
  ])

  return (
    <div className='w-full h-full flex flex-row justify-start mt-4 flex-wrap overflow-scroll no-scrollbar gap-6 lg:gap-4'>
      <div className=' w-full lg:w-[750px] flex flex-col justify-start overflow-scroll no-scrollbar'>
        <div className='flex flex-row flex-wrap items-center gap-6 lg:gap-16'>
          <div>
            <h1 className='text-2xl font-semibold text-white leading-[1.5]'>
              Hello, Subham 👋
            </h1>
            <h3 className='text-gray-400 text-sm'>
              Quickly access your tasks and recent GitHub activity
            </h3>
          </div>
          <div className='flex flex-row gap-2 items-center bg-secondary px-4 rounded-3xl hover:border-btnclr border-2 border-transparent h-16 lg:w-[350px]'>
            <SearchIcon size='24' className='text-white' />
            <input
              type='text'
              placeholder='Search tasks'
              className='bg-secondary text-white px-4 py-2 rounded-lg outline-none'
            />
          </div>
        </div>
        <div className='my-8 flex flex-row items-center flex-wrap gap-8'>
          <StreakCard />
          <DashboardBtn />
        </div>
        <h2 className='mt-4 mb-4 flex flex-row items-center gap-3 text-white text-xl font-semibold'>
          <Github size='24' className='text-white' />
          Recent GitHub Activity
        </h2>
        <div className='flex flex-row flex-wrap gap-8'>
          {
            repos?.map((repo) => {
              return (
                <RepoCard repo={repo} key={repo.id} />
              )
            })
          }
        </div>
      </div>
      <div className='w-full lg:h-full overflow-scroll no-scrollbar lg:w-[420px] flex flex-col items-start justify-start gap-4 bg-gradient-to-tl from-secondary via-secondary to-secondary p-4 rounded-3xl
      shadow-md shadow-black transition-all mb-5'>
        <h2 className='text-2xl font-semibold flex flex-row items-center gap-3'>
          <HistoryIcon size='24' className='text-white' />
          Active Tasks
        </h2>
        {
          tasks.map((task) => {
            return (
              <ActiveTaskCard task={task} key={task.id} isDashboard={true} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard
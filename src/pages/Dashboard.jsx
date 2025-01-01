import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard'
import batman from '../assets/batman.jpg'
import { FileStackIcon, Github, HistoryIcon, LucideClipboardPenLine, SearchIcon, SquareStackIcon } from 'lucide-react'
import ActiveTaskCard from '../components/ActiveTaskCard'
import StreakCard from '../components/StreakCard'
import DashboardBtn from '../components/DashboardBtn'
import getGithubRepos from '../hooks/useGithubRepos.mjs'
import { set } from 'zod'
import Search from '../components/Search'
import IncomponentLoading from '../components/InComponentLoading'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  let { repos, loading } = getGithubRepos();
  let { tasks } = useSelector(state => state.tasks)
  let activeTasks = tasks.filter(task => task.status === 'active')
  let { name } = useSelector(state => state.user)
  let { isAuthenticated } = useSelector(state => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, []);


  return (
    <div className='w-full h-full flex flex-row justify-start mt-4 flex-wrap overflow-scroll no-scrollbar gap-6 lg:gap-4'>
      <div className=' w-full lg:w-[750px] flex flex-col justify-start overflow-scroll no-scrollbar'>
        <div className='flex flex-row flex-wrap items-center gap-6 lg:gap-16'>
          <div>
            <h1 className='text-2xl font-semibold text-white leading-[1.5]'>
              Hello, {name} 👋
            </h1>
            <h3 className='text-gray-400 text-sm'>
              Quickly access your tasks and recent GitHub activity
            </h3>
          </div>
          <Search />
        </div>
        <div className='my-8 flex flex-row items-center flex-wrap gap-8'>
          <StreakCard />
          <DashboardBtn />
        </div>
        <h2 className='mt-4 mb-4 flex flex-row items-center gap-3 text-white text-xl font-semibold'>
          <Github size='24' className='text-white' />
          Recent GitHub Activity
        </h2>
        {
          loading ?
            <IncomponentLoading isShort={true} />
            :
            <div className='flex flex-row flex-wrap gap-8'>
              {
                repos?.map((repo) => {
                  return (
                    <RepoCard repo={repo} key={repo.id} />
                  )
                })
              }
            </div>
        }
      </div>
      <div className='w-full lg:h-full overflow-scroll no-scrollbar lg:w-[420px] flex flex-col items-start justify-start gap-4 bg-gradient-to-tl from-secondary via-secondary to-secondary p-4 rounded-3xl
      shadow-md shadow-black transition-all mb-5'>
        <h2 className='text-2xl font-semibold flex flex-row items-center gap-3'>
          <HistoryIcon size='24' className='text-white' />
          Active Tasks
        </h2>
        {
          activeTasks?.map((task) => {
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
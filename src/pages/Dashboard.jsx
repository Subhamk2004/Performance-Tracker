import React, { useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import { Github, HistoryIcon, PlusCircle } from 'lucide-react'
import ActiveTaskCard from '../components/ActiveTaskCard'
import StreakCard from '../components/StreakCard'
import DashboardBtn from '../components/DashboardBtn'
import getGithubRepos from '../hooks/useGithubRepos.mjs'
import Search from '../components/Search'
import IncomponentLoading from '../components/InComponentLoading'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useTasks from '../hooks/useTasks.mjs'

function Dashboard() {
  useTasks();
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
        <div className='flex flex-row items-center gap-5'>
          <h2 className='mt-4 mb-4 flex flex-row items-center gap-3 text-white text-xl font-semibold'>
            <Github size='24' className='text-white' />
            Recent GitHub Activity
          </h2>
          <Link className="flex flex-row items-center gap-2 bg-gradient-to-tl from-blue-500 via-secondary to-secondary text-white rounded-full px-4 py-2 hover:scale-105 transition-all" to='https://github.com/new' target='_blank'>
            <PlusCircle size='24' className='text-white' />
            New Repo
          </Link>
        </div>
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
              <ActiveTaskCard task={task} key={task._id} isDashboard={true} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard
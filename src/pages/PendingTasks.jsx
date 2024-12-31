import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ActiveTaskCard from '../components/ActiveTaskCard';
import TaskNav from '../components/TaskNav';

function PendingTasks() {
    let { tasks } = useSelector(state => state.tasks)
    let pendingTasks = tasks.filter(task => task.status === 'pending')

    useEffect(() => {
        console.log('Tasks:', tasks);
    }, [tasks]);
    return (
        <div className='w-full h-full flex flex-col items-center justify-start overflow-scroll no-scrollbar'>
            <TaskNav />
            <div className='w-full flex flex-col items-center justify-start gap-4 mt-4 bg-secondary p-4 rounded-3xl'>
                {
                    pendingTasks?.length > 0 ?
                    pendingTasks.map((task, index) => {
                            return <ActiveTaskCard key={index} task={task} isDashboard={false} />
                        }) :
                        <h1 className="text-white text-2xl">No tasks found</h1>
                }
            </div>
        </div>
    )
}

export default PendingTasks
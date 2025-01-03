import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ActiveTaskCard from '../components/ActiveTaskCard';
import TaskNav from '../components/TaskNav';
import useTasks from '../hooks/useTasks.mjs';

function AllTasks() {
    useTasks();
    let { tasks } = useSelector(state => state.tasks)
    useEffect(() => {
        console.log('Tasks:', tasks);
    }, [tasks]);
    
    const [sort, setSort] = React.useState('creation');
    const sortTasks = (tasks, sortBy) => {
        const priorityWeight = {
            'high': 3,
            'medium': 2,
            'low': 1
        };

        return [...tasks].sort((a, b) => {
            switch (sortBy) {
                case 'completion':
                    return new Date(b.dueDate) - new Date(a.dueDate);
                case 'priority':
                    const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
                    if (priorityDiff !== 0) return priorityDiff;
                    return new Date(b.dueDate) - new Date(a.dueDate);
                case 'creation':
                    return new Date(b.created_at) - new Date(a.created_at);
                default:
                    return 0;
            }
        });
    };

    const sortedTasks = sortTasks(tasks, sort);

    return (
        <div className='w-full h-full flex flex-col items-start justify-start overflow-scroll no-scrollbar'>
            <TaskNav />
            <div className='bg-secondary p-5 flex items-center rounded-3xl'>
                <p>Sort by: </p>
                <select
                    className='p-2 bg-primary text-white rounded-lg ml-2'
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="creation">Creation Date</option>
                    <option value="completion">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
            <div className='w-full flex flex-col items-center justify-start gap-4 mt-4 bg-secondary p-4 rounded-3xl'>

                {
                    sortedTasks?.length > 0 ?
                        sortedTasks.map((task, index) => {
                            return <ActiveTaskCard key={index} task={task} isDashboard={false} />
                        }) :
                        <h1 className="text-white text-2xl">No tasks found</h1>
                }
            </div>
        </div>
    )
}

export default AllTasks
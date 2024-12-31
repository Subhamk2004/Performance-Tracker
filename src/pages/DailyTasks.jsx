import React from 'react';
import { useSelector } from 'react-redux';
import ActiveTaskCard from '../components/ActiveTaskCard';
import { format, parseISO } from 'date-fns';

function DailyTasks() {
    const { tasks } = useSelector(state => state.dailyTasks);

    const groupTasksByDate = () => {
        if (!tasks?.length) return [];

        const grouped = tasks.reduce((acc, task) => {
            if (!task.dueDate) return acc;
            const date = format(parseISO(task.dueDate), 'yyyy-MM-dd');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(task);
            return acc;
        }, {});

        return Object.entries(grouped)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));
    };

    const groupedTasks = groupTasksByDate();

    return (
        <div className='w-full h-full flex flex-col items-start justify-start overflow-scroll no-scrollbar'>
            <div className='w-full flex flex-col items-center justify-start gap-8 mt-4 bg-secondary p-4 rounded-3xl'>
                {groupedTasks.length > 0 ? (
                    groupedTasks.map(([date, dateTasks]) => (
                        <div key={date} className="w-full">
                            <h2 className="text-white text-xl font-semibold mb-4">
                                {format(parseISO(date), 'MMMM d, yyyy')}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {dateTasks.map((task, index) => (
                                    <ActiveTaskCard
                                        key={`${date}-${index}`}
                                        task={task}
                                        isDashboard={false}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-white text-2xl">No pending tasks</h1>
                )}
            </div>
        </div>
    );
}

export default DailyTasks;
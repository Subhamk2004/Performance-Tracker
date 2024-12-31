import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, Square, AlertCircle, BookOpenTextIcon } from 'lucide-react';

const ActiveTaskCard = ({ task, isDashboard = false }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    let [loading, setLoading] = useState(false);
    let server_url = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleCheck = () => {
        setIsChecked(!isChecked);
        setShowUpdate(!showUpdate);
    };

    const updateTask = async () => {
        console.log('Task updated:', task._id);
        try {
            setLoading(true);
            let response = await fetch(`${server_url}/api/updateTask?${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taskId: task._id })
            });
            let data = await response.json();
            console.log('Task updated:', data);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-blue-500',
            medium: 'bg-yellow-500',
            high: 'bg-red-500'
        };
        return colors[priority] || colors.low;
    };

    return (
        <div className="bg-primary rounded-3xl p-6 transition-all w-full"
        >
            <div className="flex items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-4">
                    {
                        !isDashboard &&
                        <button onClick={handleCheck} className="text-gray-300 hover:text-[#698eff]">
                            {isChecked ?
                                <CheckSquare className="w-6 h-6" /> :
                                <Square className="w-6 h-6" />
                            }
                        </button>
                    }
                    <h3 className="text-lg font-bold text-[#698eff]">{task.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`flex items-center text-xs px-3 py-1 rounded-full ${getPriorityColor(task.priority)} text-white`}>
                        <AlertCircle size={12} className="mr-1" />
                        {task.priority}
                    </span>
                </div>
            </div>

            <p className="text-gray-300 text-sm mb-6 flex flex-row items-center gap-1">
                <BookOpenTextIcon size={16} className="mr-1" />
                {task.description}
            </p>

            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 gap-4">
                <div className="flex items-center gap-4">
                    <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Created: {formatDate(task.created_at)}
                    </span>
                    <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        Due: {formatDate(task.dueDate)}
                    </span>
                </div>
            </div>

            {showUpdate && !isDashboard && (
                <div className="mt-4 flex justify-between">
                    <p className='text-red-400 py-2 text-xs'>*This action cannot be undone</p>
                    <button
                        className="bg-[#698eff] text-[#111525] px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 transition-all"
                        onClick={updateTask}
                    >
                        Mark Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActiveTaskCard;
import React from 'react';
import { Plus, ListTodo, Clock, Calendar, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddTaskButton = () => {
    const navigate = useNavigate();
    let { tasks } = useSelector(state => state.tasks)
    let activeTasks = tasks.filter(task => task.status === 'active')
    let pendingTasks = tasks.filter(task => task.status === 'pending')
    let activeTasksNum = activeTasks.length;
    let pendingTasksNum = pendingTasks.length;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div

            className="w-[350px] h-[350px] group relative bg-[#111525] hover:bg-gradient-to-tl from-secondary via-secondary to-secondary rounded-3xl p-6 shadow-lg transition-all duration-300  overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plus className="w-40 h-40 text-white" />
            </div>

            {/* Main content */}
            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-white text-2xl font-bold mb-2">Add New Task</h2>
                    <p className="text-gray-400 text-sm">{today}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => navigate('/alltask')} className="bg-[#050508] rounded-xl p-4">

                        <span className="text-gray-400 text-sm flex items-center gap-2">
                            <ListTodo className="w-6 h-6 text-white" />
                            Active Tasks
                        </span>
                        <p className="text-white text-lg font-bold mt-4">{activeTasksNum}</p>
                    </button>
                    <button
                        onClick={() => navigate('/alltask')}
                        className="bg-[#050508] rounded-xl p-4">
                        <span className="text-gray-400 text-sm flex flex-row items-center gap-2">
                            <Clock className="w-5 h-5 text-white" />
                            Pending Task
                        </span>
                        <p className="text-white text-lg font-bold mt-4">{pendingTasksNum}</p>
                    </button>
                </div>

                <button
                    onClick={() => navigate('/addtask')}
                    className="mt-auto flex items-center justify-between bg-[#050508] rounded-xl p-4 group-hover:bg-white transition-colors">
                    <div className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-white group-hover:text-[#111525] transform group-hover:rotate-90 transition-all" />
                        <span className="font-semibold text-white group-hover:text-[#111525]">Create Task</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white group-hover:text-[#111525] transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default AddTaskButton;
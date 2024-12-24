import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { Plus, Calendar, Clock, AlertCircle } from 'lucide-react';

const AddTask = () => {
    const [showNormalForm, setShowNormalForm] = useState(false);
    const [showDailyForm, setShowDailyForm] = useState(false);

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        toBeDoneBy: ''
    });

    const [dailyData, setDailyData] = useState({
        title: '',
        description: '',
    });

    let priorityOptions = ['low', 'medium', 'high'];
    const maxDateObj = new Date();
    maxDateObj.setDate(maxDateObj.getDate() + 30);
    const maxDate = maxDateObj.toISOString().split("T")[0];

    const handleSubmitTask = (e) => {
        e.preventDefault();
        console.log('Task Data:', taskData);
        setShowNormalForm(false);
        setTaskData({ title: '', description: '', status: 'pending', priority: 'low', toBeDoneBy: '' });
    };

    const handleSubmitDaily = (e) => {
        e.preventDefault();
        console.log('Daily Data:', dailyData);
        setShowDailyForm(false);
        setDailyData({ title: '', description: '' });
    };

    return (
        <div className='w-full h-full flex flex-col justify-start mt-4 overflow-scroll no-scrollbar px-6'>
            <h1 className="text-3xl font-bold text-white mb-8">Add New Task</h1>

            {/* Button Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Normal Task Button */}
                <button
                    onClick={() => {
                        setShowNormalForm(true);
                        setShowDailyForm(false);
                    }}
                    className="bg-[#111525] hover:bg-[#1a1f35] rounded-2xl p-6 transition-all group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Clock className="w-8 h-8 text-btnclr" />
                        <h3 className="text-xl font-semibold text-white text-justify">Normal Task</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 text-justify lg:text-base">Create a task with priority, deadline, and status tracking</p>
                    <div className="flex justify-end">
                        <Plus className="w-6 h-6 text-btnclr group-hover:rotate-90 transition-transform" />
                    </div>
                </button>

                {/* Daily Activity Button */}
                <button
                    onClick={() => {
                        setShowDailyForm(true);
                        setShowNormalForm(false);
                    }}
                    className="bg-[#111525] hover:bg-[#1a1f35] rounded-2xl p-6 transition-all group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Calendar className="w-8 h-8 text-btnclr" />
                        <h3 className="text-xl font-semibold text-white text-justify">Daily Activity</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 text-justify lg:text-base">Add a simple daily task or routine activity</p>
                    <div className="flex justify-end">
                        <Plus className="w-6 h-6 text-btnclr group-hover:rotate-90 transition-transform" />
                    </div>
                </button>
            </div>

            {/* Normal Task Form */}
            {showNormalForm && (
                <form onSubmit={handleSubmitTask} className="bg-[#111525] rounded-2xl p-6 mb-6 animate-fadeIn">
                    <h2 className="text-xl font-semibold text-white mb-6">Create Normal Task</h2>
                    <div className="space-y-4">
                        <FormInput
                            title="Task Title"
                            labelFor="title"
                            placeholder="Enter task title"
                            type="text"
                            isRequired={true}
                            inputClassName='bg-primary/50 text-black'
                            labelClassName='ml-1'
                            value={taskData.title}
                            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        />
                        <FormInput
                            title="Description"
                            labelFor="description"
                            placeholder="Enter task description"
                            type="text"
                            inputClassName='bg-primary/50 text-black'
                            labelClassName='ml-1'
                            value={taskData.description}
                            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                title="Priority"
                                labelFor="priority"
                                isSelect={true}
                                selectOptions={priorityOptions}
                                inputClassName='bg-primary/50 text-black'
                                labelClassName='ml-1'
                                value={taskData.priority}
                                onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                            />
                            <FormInput
                                title="Due Date"
                                labelFor="toBeDoneBy"
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max={maxDate}
                                isRequired={true}
                                inputClassName='bg-primary/50 text-black'
                                labelClassName='ml-1'
                                value={taskData.toBeDoneBy}
                                onChange={(e) => setTaskData({ ...taskData, toBeDoneBy: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowNormalForm(false)}
                                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-btnclr text-[#111525] px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* Daily Activity Form */}
            {showDailyForm && (
                <form onSubmit={handleSubmitDaily} className="bg-[#111525] rounded-2xl p-6 mb-6 animate-fadeIn">
                    <h2 className="text-xl font-semibold text-white mb-6">Create Daily Activity</h2>
                    <div className="space-y-4">
                        <FormInput
                            title="Activity Title"
                            labelFor="dailyTitle"
                            placeholder="Enter activity title"
                            type="text"
                            isRequired={true}
                            value={dailyData.title}
                            inputClassName='bg-primary/50 text-black'
                            labelClassName='ml-1'
                            onChange={(e) => setDailyData({ ...dailyData, title: e.target.value })}
                        />
                        <FormInput
                            title="Description"
                            labelFor="dailyDescription"
                            placeholder="Enter activity description"
                            type="text"
                            inputClassName='bg-primary/50 text-black'
                            labelClassName='ml-1'
                            value={dailyData.description}
                            onChange={(e) => setDailyData({ ...dailyData, description: e.target.value })}
                        />
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowDailyForm(false)}
                                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-btnclr text-[#111525] px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                            >
                                Create Activity
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddTask;
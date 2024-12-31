import React, { useState, useEffect } from 'react';
import { Flame, Trophy, Target, Award } from 'lucide-react';
import { useSelector } from 'react-redux';
import useStreak from '../hooks/useStreak.mjs';

const StreakCard = () => {
    const [stats, setStats] = useState({
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0,
        totalTasks: 0
    });

    const { streak, longestStreak, loading } = useStreak();
    const { tasks } = useSelector(state => state.tasks);
    const { tasks: dailyTasks } = useSelector(state => state.dailyTasks);

    useEffect(() => {
        const totalTasks = tasks.length + dailyTasks.length;
        const pendingTasks = tasks.filter(task => task.status === 'pending');
        const completedTasks = tasks.filter(task => task.status === 'completed');
        const completionRate = completedTasks.length / (pendingTasks.length + completedTasks.length) * 100;

        setStats({
            currentStreak: streak,
            longestStreak: longestStreak,
            completionRate: isNaN(completionRate) ? 0 : completionRate.toFixed(1),
            totalTasks
        });
    }, [streak, longestStreak, tasks, dailyTasks, loading]);

    return (
        <div className="bg-[#111525] rounded-3xl p-6 h-[350px] w-[350px] shadow-lg shadow-black transition-all bg-gradient-to-tl from-secondary via-secondary to-secondary border-gray-600">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Streak Stats</h3>
                    <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 flex-grow">
                    <div className="bg-[#050508] rounded-2xl p-4 flex flex-col items-center justify-center">
                        <div className="text-orange-500 mb-2">
                            <Flame className="w-8 h-8" />
                        </div>
                        <span className="text-2xl font-bold text-white mb-1">{stats.currentStreak}</span>
                        <span className="text-xs text-gray-400">Current Streak</span>
                    </div>

                    <div className="bg-[#050508] rounded-2xl p-4 flex flex-col items-center justify-center">
                        <div className="text-yellow-500 mb-2">
                            <Trophy className="w-8 h-8" />
                        </div>
                        <span className="text-2xl font-bold text-white mb-1">{stats.longestStreak}</span>
                        <span className="text-xs text-gray-400">Longest Streak</span>
                    </div>

                    <div className="bg-[#050508] rounded-2xl p-4 flex flex-col items-center justify-center">
                        <div className="text-purple-500 mb-2">
                            <Target className="w-8 h-8" />
                        </div>
                        <span className="text-2xl font-bold text-white mb-1">{stats.completionRate}%</span>
                        <span className="text-xs text-gray-400">Completion Rate</span>
                    </div>

                    <div className="bg-[#050508] rounded-2xl p-4 flex flex-col items-center justify-center">
                        <div className="text-blue-500 mb-2">
                            <Award className="w-8 h-8" />
                        </div>
                        <span className="text-2xl font-bold text-white mb-1">{stats.totalTasks}</span>
                        <span className="text-xs text-gray-400">Total Tasks</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreakCard;
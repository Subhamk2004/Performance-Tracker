import React from 'react';
import { Flame, Trophy, Target, Award, Star } from 'lucide-react';

const StreakCard = ({ stats = {
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 45,
    completionRate: 92,
    totalTasks: 156
} }) => {
    return (
        <div className="bg-[#111525] rounded-3xl p-6 h-[350px] w-[350px] shadow-lg shadow-black transition-all bg-gradient-to-tl from-secondary via-secondary to-secondary border-gray-600">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Streak Stats <span className='text-sm text-white'>(monthly)</span></h3>
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
import React from 'react';
import { GitFork, Star, Circle, Code, Calendar, Eye, AlertCircle, GitBranch, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RepoCard = ({ repo }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const statsData = [
        { name: 'Stars', value: repo.stargazers_count },
        { name: 'Forks', value: repo.forks_count },
        { name: 'Issues', value: repo.open_issues_count },
        { name: 'Watchers', value: repo.watchers_count }
    ];
    let sum = repo.stargazers_count + repo.forks_count + repo.open_issues_count + repo.watchers_count;

    return (
        <div className="bg-[#111525] rounded-3xl p-6 shadow-lg shadow-black transition-all bg-gradient-to-tl from-secondary via-secondary to-secondary border-gray-600 w-[350px]">
            {/* Repository Name and Visibility */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white hover:underline">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </h3>
                </div>
                <span className="flex items-center text-sm text-gray-400 bg-[#050508] px-2 py-1 rounded-full">
                    {repo.visibility === 'public' ?
                        <Circle size={12} className="mr-1" /> :
                        <ShieldCheck size={12} className="mr-1" />
                    }
                    {repo.visibility}
                </span>

            </div>

            <p className="text-gray-300 text-sm mb-4">
                {repo.description || 'No description available'}
            </p>

            {/* Stats Graph */}
            {
                sum > 0 &&
                <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statsData} margin={{ top: 0, right: 0, left: -7, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                width={30}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#050508',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#9ca3af'
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#4151d8"
                                radius={[12, 12, 0, 0]}
                                background={{ fill: '#111525' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }

            <div className="flex items-center text-sm text-gray-300 mb-4">
                <Code size={16} className="mr-1" />
                {repo.language || 'No language'}
            </div>

            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 gap-2">
                <div className="flex items-center gap-4">
                    <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Updated: {formatDate(repo.updated_at)}
                    </span>
                    <span className="flex items-center">
                        <GitBranch size={16} className="mr-1" />
                        {repo.default_branch}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#050508]">
                        {repo.size}KB
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RepoCard;
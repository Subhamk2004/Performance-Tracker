import React, { useState } from 'react';
import { Calendar, Clock, Hash, Edit, Trash, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note, onDelete, loading }) => {
    const [showActions, setShowActions] = useState(false);
    const navigate = useNavigate();
    let [clampStyle, setClampStyle] = useState('line-clamp-3');
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        // navigate(`/notes/edit/${note._id}`);
    };

    return (
        <div
            className="bg-secondary rounded-3xl p-6 transition-all hover:shadow-lg w-[350px] shadow-lg shadow-black"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <BookOpen className="w-6 h-6 text-[#698eff]" />
                    <h3 className="text-xl font-bold text-[#698eff]">{note.title}</h3>
                </div>

                {showActions && (
                    <div className="flex items-center gap-3">
                        {/* <button
                            onClick={handleEdit}
                            className="text-gray-400 hover:text-[#698eff] transition-colors"
                        >
                            <Edit size={18} />
                        </button> */}
                        <button
                            onClick={() => onDelete(note._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className={`text-gray-300 text-lg mb-3 ${clampStyle}`}>
                {note.content}
            </div>
            {
                clampStyle === 'line-clamp-none' ?
                    <button className='mb-3 bg-btnclr text-black p-1 px-3 rounded-3xl text-sm'
                        onClick={(e) => setClampStyle('line-clamp-3')}
                    >
                        Read less
                    </button>
                    :
                    <button className='mb-3 bg-btnclr text-black p-1 px-3 rounded-3xl text-sm'
                        onClick={(e) => setClampStyle('line-clamp-none')}
                    >
                        Read more
                    </button>
            }

            <div className="flex flex-wrap gap-2 mb-4">
                {note.hashtags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center text-xs px-3 py-1 rounded-full bg-[#2a3447] text-[#698eff]"
                    >
                        <Hash size={12} className="mr-1" />
                        {tag.replace('#', '')}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                    <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Created: {formatDate(note.created_at)}
                    </span>
                    {/* <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        Updated: {formatDate(note.updated_at)}
                    </span> */}
                </div>
                {/* <span className="text-xs text-gray-500">
                    By {note.username}
                </span> */}
            </div>
        </div>
    );
};

export default NoteCard;
import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import IncomponentLoading from './InComponentLoading';
import { useDispatch } from 'react-redux';

function SearchedItems({
    searchedItems: items,
    closeSearch,
    loading,
    isNoteSearch = false
}) {
    let [searchedItems, setSearchedItems] = useState(items);
    const dispatch = useDispatch();

    useEffect(() => {
        setSearchedItems(items);
    }, [items]);
    
    // Function to handle note click
    const handleNoteClick = (noteId) => {
        // Close the search dialog
        closeSearch();
        
        // Small delay to allow the search dialog to close
        setTimeout(() => {
            // Find the note element on the page and scroll to it
            const noteElement = document.getElementById(`note-${noteId}`);
            if (noteElement) {
                noteElement.scrollIntoView({ behavior: 'smooth' });
                // Add a highlight effect
                noteElement.classList.add('note-highlight');
                // Remove the highlight after animation completes
                setTimeout(() => {
                    noteElement.classList.remove('note-highlight');
                }, 2000);
            }
        }, 100);
    };

    const renderNoteItem = (note, index) => (
        <div 
            key={index} 
            className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px] overflow-scroll no-scrollbar cursor-pointer hover:bg-[#1a2035] hover:border hover:border-btnclr"
            onClick={() => handleNoteClick(note._id)}
        >
            <div className='flex flex-row justify-between items-center gap-2'>
                <h3 className="text-lg font-bold text-white">
                    {note.title || note.name}
                </h3>
                <span className='text-sm text-gray-400'>
                    {new Date(note.updated_at || note.created_at).toLocaleDateString()}
                </span>
            </div>
            <p className='text-gray-300 text-sm mt-2 line-clamp-2'>
                {note.content || note.description}
            </p>
            {note.hashtags && note.hashtags.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-2'>
                    {note.hashtags.map((tag, idx) => (
                        <span key={idx} className='text-xs bg-btnclr text-black px-2 py-0.5 rounded-full'>
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );

    const renderRepoItem = (item, index) => (
        <div key={index} className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px] overflow-scroll no-scrollbar">
            <div className='flex flex-row justify-between items-center gap-2'>
                <h3 className="text-lg font-bold text-white hover:underline">
                    <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                        {item.name}
                    </a>
                </h3>
                <span className='flex items-center gap-2'>
                    <img src={item.owner.avatar_url} alt={item.owner.login} className='w-8 h-8 rounded-full' />
                    <a className='text-sm text-gray-400 hover:underline' href={item.owner.html_url} target="_blank" rel="noopener noreferrer">
                        {item.owner.login}
                    </a>
                </span>
            </div>
            <p className='text-gray-300 text-sm mt-1'>
                Updated: {new Date(item.updated_at).toDateString()}
            </p>
            <p className="text-gray-300 text-sm">
                {item.description || ''}
            </p>
        </div>
    );

    return (
        <>
            {
                searchedItems.length === 0 ?
                    <div className='bg-secondary p-3 rounded-3xl mt-2 flex flex-col gap-3 shadow-black shadow-lg absolute z-20'>
                        <button className='flex justify-end' onClick={closeSearch}>
                            <X size='24' className='text-white' />
                        </button>
                        <div className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px]">
                            {
                                loading ?
                                    <IncomponentLoading isShort={true} />
                                    :
                                    <h3 className="text-lg font-bold text-white">
                                        No {isNoteSearch ? 'notes' : 'repositories'} found
                                    </h3>
                            }
                        </div>
                    </div>
                    :
                    <div className='bg-secondary p-3 rounded-3xl mt-2 flex flex-col gap-3 shadow-black shadow-xl absolute z-20 overflow-scroll no-scrollbar max-h-[500px]'>
                        <button className='flex justify-end' onClick={closeSearch}>
                            <Plus size='24' className='text-white rotate-45 p-1 hover:bg-primary rounded-full' />
                        </button>
                        {
                            !loading ?
                                <>
                                    {
                                        searchedItems.map((item, index) => (
                                            isNoteSearch || item.isNote
                                                ? renderNoteItem(item, index)
                                                : renderRepoItem(item, index)
                                        ))
                                    }
                                </>
                                :
                                <div className="bg-[#111525] rounded-3xl p-6 transition-all bg-gradient-to-tl from-primary via-primary to-primary border-gray-600 w-[350px]">
                                    <IncomponentLoading isShort={true} />
                                </div>
                        }
                    </div>
            }
        </>
    )
}

export default SearchedItems
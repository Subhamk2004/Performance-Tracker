import React, { useState, useEffect } from 'react'
import { SearchIcon, Github, LucideClipboardPenLine } from 'lucide-react'
import SearchedItems from './SearchedItems';
import { useSelector } from 'react-redux';

function Search({
    fromWhere = 'dashboard'
}) {

    let [activeRepoBtn, setActiveRepoBtn] = useState(false);
    let [activeTaskBtn, setActiveTaskBtn] = useState(false);
    let [activeNoteBtn, setActiveNoteBtn] = useState(fromWhere === 'notes');
    let [search, setSearch] = useState('');
    let [repoBtnClassname, setRepoBtnClassname] = useState('p-1 hover:bg-primary rounded-lg relative group');
    let [taskBtnClassname, setTaskBtnClassname] = useState('p-1 hover:bg-primary rounded-lg relative group');
    let [noteBtnClassname, setNoteBtnClassname] = useState(
        fromWhere === 'notes' 
            ? 'p-1 hover:bg-primary rounded-lg relative group bg-primary' 
            : 'p-1 hover:bg-primary rounded-lg relative group'
    );
    let [loading, setLoading] = useState(false);
    let [items, setItems] = useState([]);
    let { githubusername } = useSelector(state => state.user);
    let { notes } = useSelector(state => state.notes);
    const serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    // Set activeNoteBtn to true by default when on the notes page
    useEffect(() => {
        if (fromWhere === 'notes') {
            setActiveNoteBtn(true);
            setNoteBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        }
    }, [fromWhere]);

    let searchItems = async (e) => {
        e.preventDefault();
        if (search) {
            try {
                setLoading(true);
                if (activeRepoBtn) {
                    let response = await fetch(`${serverUrl}/api/github-repos?search=${search}&user=${githubusername}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch repos");
                    }
                    const data = await response.json();
                    setItems(data);
                }
                else if (activeTaskBtn) {
                    // Task search implementation would go here
                }
                else if (activeNoteBtn) {
                    // Search notes from Redux store
                    const filteredNotes = notes.filter(note => 
                        note.title.toLowerCase().includes(search.toLowerCase()) || 
                        note.content.toLowerCase().includes(search.toLowerCase()) ||
                        note.hashtags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
                    );
                    
                    // Transform notes to include required fields for display
                    const transformedNotes = filteredNotes.map(note => ({
                        ...note,
                        isNote: true, // Flag to identify as a note in the SearchedItems component
                        name: note.title,
                        description: note.content,
                        updated_at: note.updated_at || note.created_at
                    }));
                    
                    setItems(transformedNotes);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }
    
    let activateRepoBtn = () => {
        setActiveRepoBtn(true);
        setActiveTaskBtn(false);
        setActiveNoteBtn(false);
        setRepoBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        setTaskBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
        setNoteBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
    }
    
    let activateTaskBtn = () => {
        setActiveTaskBtn(true);
        setActiveRepoBtn(false);
        setActiveNoteBtn(false);
        setTaskBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        setRepoBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
        setNoteBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
    }
    
    let activateNoteBtn = () => {
        setActiveNoteBtn(true);
        setActiveRepoBtn(false);
        setActiveTaskBtn(false);
        setNoteBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        setRepoBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
        setTaskBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
    }

    return (
        <div className='relative'>
            <form className='flex flex-row gap-2 items-center bg-secondary px-4 rounded-3xl hover:border-btnclr border-2 border-transparent h-16 lg:w-[350px]'
                onSubmit={searchItems}
            >
                <button disabled={loading}>
                    <SearchIcon size='24' className='text-white' />
                </button>
                <input
                    type='text'
                    value={search}
                    readOnly={loading}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={activeNoteBtn ? 'Search notes...' : 'Search tasks, repos....'}
                    className='bg-secondary text-white px-4 py-2 rounded-lg outline-none w-[200px]'
                />
                {
                    fromWhere === 'dashboard' ? (
                        <button className={`${repoBtnClassname}`}
                            onClick={activateRepoBtn} 
                            disabled={loading}
                            type="button"
                        >
                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -bottom-7 w-32 bg-black text-white p-1 rounded'>
                                Search GitHub repos
                            </p>
                            <Github size='24' className='text-white' />
                        </button>
                    ) : (
                        <button 
                            className={`${noteBtnClassname}`}
                            onClick={activateNoteBtn} 
                            disabled={loading}
                            type="button"
                        >
                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -bottom-7 w-32 right-0 bg-black text-white p-1 rounded'>
                                Search notes
                            </p>
                            <LucideClipboardPenLine size='24' className='text-white' />
                        </button>
                    )
                }
            </form>
            {
                search && (activeRepoBtn || activeNoteBtn) &&
                <SearchedItems 
                    searchedItems={items}
                    closeSearch={() => setSearch('')}
                    loading={loading}
                    isNoteSearch={activeNoteBtn}
                />
            }
        </div>
    )
}

export default Search
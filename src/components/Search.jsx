import React, { useState, useEffect } from 'react'
import { SearchIcon, Github, LucideClipboardPenLine } from 'lucide-react'
import SearchedItems from './SearchedItems';
import { useSelector } from 'react-redux';

function Search({
    fromWhere = 'dashboard'
}) {

    let [activeRepoBtn, setActiveRepoBtn] = useState(false);
    let [activeTaskBtn, setActiveTaskBtn] = useState(false);
    let [search, setSearch] = useState('');
    let [repoBtnClassname, setRepoBtnClassname] = useState('p-1 hover:bg-primary rounded-lg relative group');
    let [taskBtnClassname, setTaskBtnClassname] = useState('p-1 hover:bg-primary rounded-lg relative group');
    let [loading, setLoading] = useState(false);
    let [items, setItems] = useState([]);
    let { githubusername } = useSelector(state => state.user);
    const serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    let searchRepo = async (e) => {
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
        setRepoBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        setTaskBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
        setActiveTaskBtn(false);
    }
    let activateTaskBtn = () => {
        setActiveTaskBtn(true);
        setTaskBtnClassname('p-1 hover:bg-primary rounded-lg relative group bg-primary');
        setRepoBtnClassname('p-1 hover:bg-primary rounded-lg relative group');
        setActiveRepoBtn(false);
    }


    return (
        <div className='relative'>
            <form className='flex flex-row gap-2 items-center bg-secondary px-4 rounded-3xl hover:border-btnclr border-2 border-transparent h-16 lg:w-[350px]'
                onSubmit={searchRepo}
            >
                <button disabled={loading}>
                    <SearchIcon size='24' className='text-white' />
                </button>
                <input
                    type='text'
                    value={search}
                    readOnly={loading}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search tasks, repos....'
                    className='bg-secondary text-white px-4 py-2 rounded-lg outline-none w-[200px]'
                />
                {
                    fromWhere === 'dashboard' ?
                        <button className={`${repoBtnClassname}`}
                            onClick={activateRepoBtn} disabled={loading}
                        >
                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -bottom-7 w-32 bg-black text-white p-1 rounded'>
                                Search GitHub repos
                            </p>
                            <Github size='24' className='text-white' />
                        </button>
                        :

                        <button className={`${taskBtnClassname}`}
                            onClick={activateTaskBtn} disabled={loading}
                        >
                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs absolute -bottom-7 w-32 right-0 bg-black text-white p-1 rounded'>Search tasks, notes...</p>
                            <LucideClipboardPenLine size='24' className='text-white' />
                        </button>
                }

            </form>
            {
                search && activeRepoBtn &&
                <SearchedItems searchedItems={items}
                    closeSearch={() => setSearch('')}
                    loading={loading}
                />
            }
        </div>
    )
}

export default Search
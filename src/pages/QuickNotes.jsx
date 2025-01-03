// QuickNotes.jsx
import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { ClipboardPlusIcon, XCircle } from 'lucide-react'
import FormInput from '../components/FormInput'
import IncomponentLoading from '../components/InComponentLoading'
import { useSelector } from 'react-redux'
import NoteCard from '../components/NoteCard'
import useNotes from '../hooks/useNotes.mjs'
import { useDispatch } from 'react-redux'
import { addSingleNote, deleteNote } from '../reduxSlices/Notes.mjs'

function QuickNotes() {
    useNotes();
    let { notes } = useSelector(state => state.notes);
    let sortedNotes = [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    let [showForm, setShowForm] = React.useState(false);
    const { username } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    let serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;
    let dispatch = useDispatch();
    const [noteData, setNoteData] = useState({
        title: '',
        content: '',
        hashtags: '',
        username: username
    });
    useEffect(() => {
    }, [deleteNote])


    const handleDelete = async (noteId) => {
        try {
            setLoading(true);
            const response = await fetch(`${serverUrl}/api/notes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id: noteId }),
            });
            const data = await response.json();
            if (data.success) {
                dispatch(deleteNote(noteId));
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!noteData.title.trim() || !noteData.content.trim() || !noteData.hashtags.trim()) {
            return;
        }
        const hashtagsArray = noteData.hashtags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => tag.startsWith('#') ? tag : `#${tag}`);

        const newNoteData = {
            title: noteData.title.trim(),
            content: noteData.content.trim(),
            hashtags: hashtagsArray,
            username: username
        };

        try {
            setLoading(true);
            let response = await fetch(`${serverUrl}/api/create-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNoteData),
                credentials: 'include'
            });

            let data = await response.json();

            if (data.isSaved) {
                dispatch(addSingleNote(data.note));
                setNoteData({
                    title: '',
                    content: '',
                    hashtags: '',
                    username: username
                });
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error creating note:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-start justify-start overflow-scroll no-scrollbar'>
            <div className='flex flex-col w-full gap-6'>
                <div className='flex flex-row flex-wrap items-center justify-start gap-3'>
                    <Search fromWhere='notes'/>
                    <button
                        className='bg-btnclr text-black p-4 py-3 font-semibold rounded-3xl mt-2 flex items-center justify-center'
                        onClick={() => setShowForm(!showForm)}
                        disabled={loading}
                    >
                        {!showForm ? (
                            <>
                                <ClipboardPlusIcon size={24} className='mr-2' />
                                Add Note
                            </>
                        ) : (
                            <>
                                <XCircle size={24} className='mr-2' />
                                Close Form
                            </>
                        )}
                    </button>
                </div>

                {showForm && (
                    <form
                        className='flex flex-col p-4 bg-secondary rounded-3xl gap-5 w-[80%] max-w-[500px]'
                        onSubmit={handleSubmit}
                    >
                        <FormInput
                            title="Title"
                            type='text'
                            name='title'
                            value={noteData.title}
                            isRequired={true}
                            placeholder='Enter note title'
                            label='Title'
                            inputClassName='bg-primary/50'
                            labelClassName='ml-1'
                            onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                        />
                        <FormInput
                            title="Content"
                            type='textArea'
                            name='content'
                            value={noteData.content}
                            isRequired={true}
                            placeholder='Enter note content'
                            label='Content'
                            inputClassName='bg-primary/50 h-24'
                            labelClassName='ml-1'
                            onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                        />
                        <FormInput
                            title="Hashtags"
                            type='text'
                            name='hashtags'
                            value={noteData.hashtags}
                            isRequired={true}
                            placeholder='react, js, c++'
                            label='Hashtags'
                            inputClassName='bg-primary/50'
                            labelClassName='ml-1'
                            onChange={(e) => setNoteData({ ...noteData, hashtags: e.target.value })}
                            alertText='Enter hashtags separated by commas'
                        />
                        <button
                            className='bg-btnclr text-black p-4 py-3 font-semibold rounded-3xl mt-2 flex items-center justify-center'
                            disabled={loading}
                        >
                            {loading ? <IncomponentLoading isShort={true} /> : 'Add Note'}
                        </button>
                    </form>
                )}

                <div className='flex flex-row flex-wrap gap-4 '>
                    {sortedNotes?.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={handleDelete}
                            loading={loading}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuickNotes
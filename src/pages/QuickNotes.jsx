// QuickNotes.jsx
import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import { ClipboardPlusIcon, XCircle, Edit2 } from 'lucide-react'
import FormInput from '../components/FormInput'
import IncomponentLoading from '../components/InComponentLoading'
import { useSelector } from 'react-redux'
import NoteCard from '../components/NoteCard'
import useNotes from '../hooks/useNotes.mjs'
import { useDispatch } from 'react-redux'
import { addSingleNote, deleteNote, updateNote } from '../reduxSlices/Notes.mjs'

function QuickNotes() {
    useNotes();
    let { notes } = useSelector(state => state.notes);
    let sortedNotes = [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    let [showForm, setShowForm] = React.useState(false);
    const { username } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    let serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;
    let dispatch = useDispatch();
    
    // State to track current editing note
    const [isEditing, setIsEditing] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    
    const [noteData, setNoteData] = useState({
        title: '',
        content: '',
        hashtags: '',
        username: username,
        isCode: false // Track if content is code
    });
    
    // Reset form when closing
    const resetForm = () => {
        setNoteData({
            title: '',
            content: '',
            hashtags: '',
            username: username,
            isCode: false
        });
        setIsEditing(false);
        setCurrentNoteId(null);
        setShowForm(false);
    };

    const styles = `
.note-highlight {
    animation: highlight-pulse 2s ease-in-out;
}

@keyframes highlight-pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 190, 0, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(255, 190, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 190, 0, 0); }
}
`;

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

    // Handle edit note
    const handleEditNote = (note) => {
        // Check if note contains code (based on &&&@@@ markers)
        const isCodeContent = note.content.includes('&&&@@@');
        
        // Process content for editing
        let processedContent = note.content;
        if (isCodeContent) {
            // Extract code from between markers
            const codeMatch = /&&&@@@(?:(\w+)?\n)?([\s\S]*?)@@@&&&/g.exec(note.content);
            if (codeMatch && codeMatch[2]) {
                processedContent = codeMatch[2];
            }
        }
        
        // Format hashtags for editing
        const hashtagsString = note.hashtags.join(', ');
        
        setNoteData({
            title: note.title,
            content: processedContent,
            hashtags: hashtagsString,
            username: username,
            isCode: isCodeContent
        });
        
        setIsEditing(true);
        setCurrentNoteId(note._id);
        setShowForm(true);
    };

    // Handle update note
    const handleUpdateNote = async (e) => {
        e.preventDefault();
        if (!noteData.title.trim() || !noteData.content.trim() || !noteData.hashtags.trim()) {
            return;
        }
        
        const hashtagsArray = noteData.hashtags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => tag.startsWith('#') ? tag : `#${tag}`);

        // Process content based on whether it's code or not
        let processedContent = noteData.content.trim();
        if (noteData.isCode) {
            processedContent = `&&&@@@\n${processedContent}\n@@@&&&`;
        }

        const updatedNoteData = {
            id: currentNoteId,
            title: noteData.title.trim(),
            content: processedContent,
            hashtags: hashtagsArray
        };

        try {
            setLoading(true);
            let response = await fetch(`${serverUrl}/api/notes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNoteData),
                credentials: 'include'
            });

            let data = await response.json();

            if (data.success) {
                dispatch(updateNote(data.note));
                resetForm();
                
                // Highlight the updated note
                setTimeout(() => {
                    const noteElement = document.getElementById(`note-${data.note._id}`);
                    if (noteElement) {
                        noteElement.classList.add('note-highlight');
                        setTimeout(() => {
                            noteElement.classList.remove('note-highlight');
                        }, 2000);
                    }
                }, 100);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            handleUpdateNote(e);
            return;
        }
        
        if (!noteData.title.trim() || !noteData.content.trim() || !noteData.hashtags.trim()) {
            return;
        }
        
        const hashtagsArray = noteData.hashtags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => tag.startsWith('#') ? tag : `#${tag}`);

        // Process content based on whether it's code or not
        let processedContent = noteData.content.trim();
        if (noteData.isCode) {
            processedContent = `&&&@@@\n${processedContent}\n@@@&&&`;
        }

        const newNoteData = {
            title: noteData.title.trim(),
            content: processedContent,
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
                resetForm();
            }
        } catch (error) {
            console.error('Error creating note:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Add the styles to highlight updated notes
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <div className='w-full h-full flex flex-col items-start justify-start overflow-scroll no-scrollbar'>
            <div className='flex flex-col w-full gap-6 overflow-scroll no-scrollbar'>
                <div className='flex flex-row flex-wrap items-center justify-start gap-3'>
                    <Search fromWhere='notes' />
                    <button
                        className='bg-btnclr text-black p-4 py-3 font-semibold rounded-3xl mt-2 flex items-center justify-center'
                        onClick={() => {
                            if (showForm) {
                                resetForm();
                            } else {
                                setShowForm(true);
                            }
                        }}
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
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                {isEditing ? 'Edit Note' : 'Add New Note'}
                            </h3>
                            {isEditing && (
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-red-500"
                                    onClick={resetForm}
                                >
                                    <XCircle size={20} />
                                </button>
                            )}
                        </div>
                        
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
                            type='textarea'
                            name='content'
                            value={noteData.content}
                            isRequired={true}
                            placeholder={noteData.isCode ? 'Enter code here' : 'Enter note content'}
                            label='Content'
                            inputClassName={`bg-primary/50 h-24 ${noteData.isCode ? 'font-mono' : ''}`}
                            labelClassName='ml-1'
                            onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                        />
                        
                        {/* Content Type Selection */}
                        <div className='flex flex-row items-center gap-4 ml-1'>
                            <div className='font-semibold'>Content Type:</div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    id='text-content'
                                    name='content-type'
                                    checked={!noteData.isCode}
                                    onChange={() => setNoteData({ ...noteData, isCode: false })}
                                />
                                <label htmlFor='text-content'>Text</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    id='code-content'
                                    name='content-type'
                                    checked={noteData.isCode}
                                    onChange={() => setNoteData({ ...noteData, isCode: true })}
                                />
                                <label htmlFor='code-content'>Code</label>
                            </div>
                        </div>
                        
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
                            {loading ? <IncomponentLoading isShort={true} /> : (
                                isEditing ? (
                                    <>
                                        <Edit2 size={18} className='mr-2' />
                                        Update Note
                                    </>
                                ) : (
                                    <>
                                        <ClipboardPlusIcon size={18} className='mr-2' />
                                        Add Note
                                    </>
                                )
                            )}
                        </button>
                    </form>
                )}

                <div className='flex flex-row flex-wrap gap-4 overflow-scroll'>
                    {sortedNotes?.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={handleDelete}
                            onEdit={handleEditNote}
                            loading={loading}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuickNotes
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../reduxSlices/Notes.mjs";
import { add } from "date-fns";

export default function useNotes() {
    const [notes, setNotes] = useState([]);
    const dispatch = useDispatch();
    let serverUrl = import.meta.env.VITE_SKILLSLOG_SERVER_URL;

    let fetchNotes = async () => {
        let response = await fetch(`${serverUrl}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        let data = await response.json();

        if (data.success) {
            console.log('Notes fetched successfully:', data.notes);
            setNotes(data);
            dispatch(addNote(data.notes));
        }
        else {
            console.log('Error fetching notes:', data.error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return { notes };
}
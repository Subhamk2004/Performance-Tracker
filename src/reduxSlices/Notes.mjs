import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    notes: []
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes = action.payload;
        },
        addSingleNote: (state, action) => {
            console.log('Adding single note:', action.payload);
            
            state.notes.push(action.payload);
        },
        deleteNote: ( state, action) => {
            let noteId = action.payload;
            console.log('Deleting note:', noteId);
            state.notes = state.notes.filter(note => note._id !== noteId);
        }
    }
});

export const { addNote, addSingleNote, deleteNote } = noteSlice.actions;
let noteReducer = noteSlice.reducer;
export default noteReducer;
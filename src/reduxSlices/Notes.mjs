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
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      let noteId = action.payload;
      state.notes = state.notes.filter(note => note._id !== noteId);
    },
    updateNote: (state, action) => {
      let updatedNote = action.payload;
      const index = state.notes.findIndex(note => note._id === updatedNote._id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
      }
    }
  }
});

export const { addNote, addSingleNote, deleteNote, updateNote } = noteSlice.actions;
let noteReducer = noteSlice.reducer;
export default noteReducer;
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const { addTask } = taskSlice.actions;
let taskReducer = taskSlice.reducer;
export default taskReducer;
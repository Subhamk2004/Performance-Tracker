import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    tasks: []
}

export const dailyTaskSice = createSlice({
    name: 'dailyTask',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const { addTask } = dailyTaskSice.actions;
let dailyTaskReducer = dailyTaskSice.reducer;
export default dailyTaskReducer;
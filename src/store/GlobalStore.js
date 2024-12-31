import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlices/UserSlice.mjs";
import taskReducer from "../reduxSlices/TaskSlice.mjs";
import dailyTaskReducer from "../reduxSlices/DailyTasks.mjs";

export const Store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
        dailyTasks: dailyTaskReducer
    }
});
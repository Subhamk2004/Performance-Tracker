import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    email: '',
    username:'',
    name: '',
    friends: [],
    isAuthenticated: false,
    githubusername: '',
    image: null,
    primarywork: '',
    institute: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.friends = action.payload.friends;
            state.isAuthenticated = true;
            state.githubusername = action.payload.githubusername;
            state.image = action.payload.image;
            state.primarywork = action.payload.primarywork;
            state.institute = action.payload.institute;
        },
        logout: (state) => {
            state.email = '';
            state.username = '';
            state.name = '';
            state.friends = [];
            state.isAuthenticated = false;
            state.githubusername = '';
            state.image = null;
            state.primarywork = '';
            state.institute = '';
        }
    }
});

export const { authenticate, logout } = userSlice.actions;
let userReducer = userSlice.reducer;
export default userReducer;
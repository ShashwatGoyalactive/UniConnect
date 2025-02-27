import { createSlice } from "@reduxjs/toolkit";

const initialState {
isLoggedIn = false,
user= null
}

const authSlice = createSlice({
    name : "auth",
    initialState,

    reducers : {
         logOut:  (state)=> {
            state.isLoggedIn = false;
            state.user = null;
        },
        login : (state , action)=> {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    }
    
}) 

export const {login , logOut} = authSlice.actions;

export default authSlice.reducer;
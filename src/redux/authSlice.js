import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authAction";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
 ? { isLoggedIn: true, user }
 : { isLoggedIn: false, user: null };

const authSlice = createSlice({
 name: "auth",
 initialState,
 extraReducersextraReducers(builder) {

  builder

   .addCase((registerUser.fulfilled), (state) => {
    state.isLoggedIn = false;
   })

   .addCase((registerUser.rejected), (state) => {
    state.isLoggedIn = false;
   })

   .addCase((loginUser.fulfilled), (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload.user;
   })

   .addCase((loginUser.rejected), (state) => {
    state.isLoggedIn = false;
    state.user = null;
   })

   .addCase((logoutUser.fulfilled), (state) => {
    state.isLoggedIn = false;
    state.user = null;
   })
 },

});


export default authSlice.reducer;
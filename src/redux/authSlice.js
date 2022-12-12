import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authAction";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, status: 'idle' }
  : { isLoggedIn: false, user: null, status: 'idle' };


const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {

    builder
      // =========== USER REGISTRATION START ========== //
      .addCase((registerUser.pending), (state) => {
        state.status = 'pending';
      })

      .addCase((registerUser.fulfilled), (state) => {
        state.status = 'fulfilled';
        state.isLoggedIn = false;
      })

      .addCase((registerUser.rejected), (state) => {
        state.status = 'rejected';
        state.isLoggedIn = false;
      })
      // =========== USER REGISTRATION END ========== //

      // =========== USER LOGIN START ========== //
      .addCase((loginUser.pending), (state) => {
        state.status = 'pending';
      })

      .addCase((loginUser.fulfilled), (state, action) => {
        state.status = 'fulfilled';
        state.isLoggedIn = true;
        state.user = action.payload.user;
      }
      )

      .addCase((loginUser.rejected), (state) => {
        state.status = 'rejected';
        state.isLoggedIn = false;
        state.user = null;
      })
      // =========== USER LOGIN END ========== //

      // =========== USER LOGOUT START ========== //
      .addCase((logoutUser.pending), (state) => {
        state.status = 'pending';
      })

      .addCase((logoutUser.fulfilled), (state) => {
        state.status = 'fulfilled';
        state.isLoggedIn = false;
        state.user = null;
      })

      .addCase((logoutUser.rejected), (state) => {
        state.status = 'rejected';
        state.isLoggedIn = true;
      })
  },

});


export default authSlice.reducer;
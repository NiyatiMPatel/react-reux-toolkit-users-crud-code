import { createSlice } from "@reduxjs/toolkit";
import { usersList, user, editUser, createUser, removeUser } from "./userAction";

const initialState = {
 users: [],
 user: {},
 status: 'idle',
 error: null,
 modalIsOpen: false,
}

const userSlice = createSlice({
 name: 'users',
 initialState,
 reducers: {
  showModal(state) {
   state.modalIsOpen = true
  },
  closeModal(state) {
   state.modalIsOpen = false
  }
 },
 extraReducers(builder) {

  builder
   // ========= USER LIST START ==============//
   .addCase((usersList.pending), (state) => {
    state.status = 'pending';
    state.error = false
   })

   .addCase((usersList.fulfilled), (state, action) => {
    state.status = 'fulfilled';
    state.users = action.payload;
    state.error = false;
   })

   .addCase((usersList.rejected), (state) => {
    state.status = 'rejected';
    state.users = [];
    state.error = true;
   })
   // ========= USER LIST END ==============//

   // ========= USER START ==============//
   .addCase((user.pending), (state) => {
    state.status = 'pending';
    state.error = false
   })

   .addCase((user.fulfilled), (state, action) => {
    state.status = 'fulfilled';
    state.user = action.payload;
    state.error = false;
   })

   .addCase((user.rejected), (state) => {
    state.status = 'rejected';
    state.user = {};
    state.error = true;
   })
   // ========= USER END ============== //

   // ========== UPDATE USER START =========== //
   .addCase((editUser.pending), (state) => {
    state.status = 'pending';
    state.error = false
   })

   .addCase((editUser.fulfilled), (state, action) => {
    state.status = 'fulfilled';
    state.users.map((user) => {
     if (user.id === action.payload.id) {
      user.firstName = action.payload.firstName
      user.lastName = action.payload.lastName
      user.email = action.payload.email
      user.gender = action.payload.gender
      user.contact = action.payload.contact
      user.age = action.payload.age
     }
    })
    state.error = false;
   })

   .addCase((editUser.rejected), (state) => {
    state.status = 'rejected';
    state.users = [];
    state.error = true;
   })
   // ========== UPDATE USER END =========== //

   // ========== POST USER END =========== //
   .addCase((createUser.pending), (state) => {
    state.status = 'pending';
    state.error = false
   })

   .addCase((createUser.fulfilled), (state, action) => {
    state.status = 'fulfilled';
    state.users.push(action.payload)
    state.error = false;
   })

   .addCase((createUser.rejected), (state) => {
    state.status = 'rejected';
    state.users = [];
    state.error = true;
   })
   // ========== POST USER END =========== //

   // ========== DELETE USER START =========== //
   .addCase((removeUser.pending), (state) => {
    state.status = 'pending';
    state.error = false
   })

   .addCase((removeUser.fulfilled), (state, action) => {
    state.status = 'fulfilled';
    state.users = state.users.filter((user) => user.id !== action.payload.id)
    state.error = false;
   })

   .addCase((removeUser.rejected), (state) => {
    state.status = 'rejected';
    state.users = [];
    state.error = true;
   })
  // ========== DELETE USER END =========== //

 }
})
export const { showModal, closeModal } = userSlice.actions
export default userSlice.reducer
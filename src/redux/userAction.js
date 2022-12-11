import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUser, addUser, updateUser, deleteUser, } from "../axios/axios-utils";
import { toast, Slide } from 'react-toastify';

// ============ USERS LIST ACTION CREATOR ============ //
export const usersList = createAsyncThunk(
 "users/fetch", async () => {
  try {
   const response = await getAllUsers()
   return response.data
  } catch (error) {
   toast.error('failed to fetch users!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
  }
 }
)

// =========== SINGLE USER ACTION CREATOR ============ //
export const user = createAsyncThunk(
 "user/fetch", async (id) => {
  try {
   const response = await getUser(id)
   return response.data

  } catch (error) {
   toast.error('failed to fetch user!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
  }
 }
)

// =========== CREATE USER ACTION CREATOR ============ //
export const createUser = createAsyncThunk(
 "user/add", async (data) => {
  try {
   const response = await addUser(data)
   toast.success('created user successfully!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
   return response.data
  } catch (error) {
   toast.error('failed to create user!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
  }
 }
)

// =========== UPDATE USER ACTION CREATOR ============ //
export const editUser = createAsyncThunk(
 "user/update", async ({ id, data }) => {
  try {
   const response = await updateUser(id, data)
   toast.success('updated user successfully!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
   return response.data

  } catch (error) {
   toast.error('failed to update user!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });

  }
 }
)

// =========== DELETE USER ACTION CREATOR ============ //
export const removeUser = createAsyncThunk(
 "user/delete", async (id) => {
  try {
   const response = await deleteUser(id)
   toast.success('deleted user successfully!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });
   return response.data

  } catch (error) {
   toast.error('failed to delete user!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    theme: "light",
   });

  }
 }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, deletee, } from "../axios/axios-utils";
import { toast } from 'react-toastify';
import { TOASTIFY_CONFIG } from "../constants/constants";

// ============ USERS LIST ACTION CREATOR ============ //
export const usersList = createAsyncThunk(
 "users/fetch", async () => {
  try {
   const response = await get('/users2')
   return response?.data
  } catch (error) {
   toast.error('failed to fetch users!', TOASTIFY_CONFIG);
  }
 }
)

// =========== SINGLE USER ACTION CREATOR ============ //
export const user = createAsyncThunk(
 "user/fetch", async (id) => {
  try {
   const response = await get(`/users2/${id}`)
   return response?.data

  } catch (error) {
   toast.error('failed to fetch user!', TOASTIFY_CONFIG);
  }
 }
)

// =========== CREATE USER ACTION CREATOR ============ //
export const createUser = createAsyncThunk(
 "user/add", async (data) => {
  try {
   const response = await post('/users2', data)
   toast.success('created user successfully!', TOASTIFY_CONFIG);
   return response?.data
  } catch (error) {
   toast.error('failed to create user!', TOASTIFY_CONFIG);
  }
 }
)

// =========== UPDATE USER ACTION CREATOR ============ //
export const editUser = createAsyncThunk(
 "user/update", async ({ id, data }) => {
  try {
   const response = await put(`/users2/${id}`, data)
   toast.success('updated user successfully!', TOASTIFY_CONFIG);
   return response?.data

  } catch (error) {
   toast.error('failed to update user!', TOASTIFY_CONFIG);

  }
 }
)

// =========== DELETE USER ACTION CREATOR ============ //
export const removeUser = createAsyncThunk(
 "user/delete", async (id) => {
  try {
   const response = await deletee(`/users2/${id}`)
   toast.success('deleted user successfully!', TOASTIFY_CONFIG);
   return response?.data

  } catch (error) {
   toast.error('failed to delete user!', TOASTIFY_CONFIG);

  }
 }
)

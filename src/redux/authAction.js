import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from '../axios/auth-utils';
import { toast } from 'react-toastify';
import { TOASTIFY_CONFIG } from "../constants/constants";

// ================= USER REGISTRATION ================== //
export const registerUser = createAsyncThunk(
 "auth/register", async ({ email, password, returnSecureToken }, thunkAPI) => {
  try {
   const response = await register(email, password, returnSecureToken);
   toast.success('user registrartion successfull!', TOASTIFY_CONFIG);
   return response.data;
  } catch (error) {
   toast.error(`${error}`, TOASTIFY_CONFIG);
   return thunkAPI.rejectWithValue();
  }
 }
);

// ================== USER LOGIN ===================== //
export const loginUser = createAsyncThunk(
 "auth/login",
 async ({ email, password, returnSecureToken }, thunkAPI) => {
  try {
   const response = await login(email, password, returnSecureToken);
   toast.success('login successfull!', TOASTIFY_CONFIG);
   return { user: response };
  } catch (error) {
   toast.error(`${error}`, TOASTIFY_CONFIG);
   return thunkAPI.rejectWithValue();
  }
 }
);

// ============ USER LOGOUT =============== //
export const logoutUser = createAsyncThunk("auth/logout", async () => {
 try {
  const response = await logout();
  toast.success('logout successfull!', TOASTIFY_CONFIG);
  return response;
 } catch (error) {
  toast.error('logout failed!', TOASTIFY_CONFIG);
 }
});
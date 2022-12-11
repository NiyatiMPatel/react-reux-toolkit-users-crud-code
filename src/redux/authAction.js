import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from '../axios/auth-utils';

// ================= USER REGISTRATION ================== //
export const registerUser = createAsyncThunk(
 "auth/register", async ({ email, password, returnSecureToken }, thunkAPI) => {
  try {
   const response = await register(email, password, returnSecureToken);
   // thunkAPI.dispatch(setMessage(response.data.message));
   return response.data;
  } catch (error) {
   // const message =
   //  (error.response &&
   //   error.response.data &&
   //   error.response.data.message) ||
   //  error.message ||
   //  error.toString();
   // thunkAPI.dispatch(setMessage(message));
   return thunkAPI.rejectWithValue();
  }
 }
);

// ================== USER LOGIN ===================== //
export const loginUser = createAsyncThunk(
 "auth/login",
 async ({ email, password }, thunkAPI) => {
  try {
   const data = await login(email, password);
   return { user: data };
  } catch (error) {
   // const message =
   //  (error.response &&
   //   error.response.data &&
   //   error.response.data.message) ||
   //  error.message ||
   //  error.toString();
   // thunkAPI.dispatch(setMessage(message));
   return thunkAPI.rejectWithValue();
  }
 }
);

// ============ USER LOGOUT =============== //
export const logoutUser = createAsyncThunk("auth/logout", async () => (
 await logout()
));
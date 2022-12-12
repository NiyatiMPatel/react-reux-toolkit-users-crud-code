import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from '../axios/auth-utils';
import { toast, Slide } from 'react-toastify';

// ================= USER REGISTRATION ================== //
export const registerUser = createAsyncThunk(
 "auth/register", async ({ email, password, returnSecureToken }, thunkAPI) => {
  try {
   const response = await register(email, password, returnSecureToken);
   toast.success('user registrartion successfull!', {
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
   return response.data;
  } catch (error) {
   if (error.response.data.error.message === 'EMAIL_EXISTS') {
    toast.error('email already exists!', {
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
   } else {
    toast.error('registration failed!', {
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
   toast.success('login successfull!', {
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
   return { user: response };
  } catch (error) {
   toast.error('login failed!', {
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
   return thunkAPI.rejectWithValue();
  }
 }
);

// ============ USER LOGOUT =============== //
export const logoutUser = createAsyncThunk("auth/logout", async () => {
 try {
  const response = await logout();
  toast.success('logout successfull!', {
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
  return response;
 } catch (error) {
  toast.error('logout failed!', {
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
});
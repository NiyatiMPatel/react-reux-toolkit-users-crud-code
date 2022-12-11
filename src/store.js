import { configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/userSlice'
import authSlice from './redux/authSlice'

export const store = configureStore({
 reducer: {
  users: userSlice,
  auth: authSlice,
 },
 devTools: true,
})
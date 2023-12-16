import axios from "axios";

import { setStorageToken, setStorageUser, remove, setSessionFlash } from "../helpers/storageService";
import { history } from "../helpers/history";

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;
const REGISTER_URL = process.env.REACT_APP_REGISTER_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

//  ===================== CREATE AXIOS AUTH INSTANCE =================== //
export const instance_auth = axios.create({
 baseURL: FIREBASE_URL,
});
//  ================== CREATE AXIOS AUTH INTERCEPTORS ====================//
// Add a request interceptor
instance_auth.interceptors.request.use(function (request) {
 // Do something before request is sent
 // console.log("🚀 ~ file: auth-utils.js:14 ~ auth-utils.js ~ request", request)

 return request;
}, function (error) {
 // Do something with request error
 console.log("🚀 ~ file: auth-utils.js:19 ~ auth-utils.js ~ error", error)

 return Promise.reject(error);
});

// Add a response interceptor
instance_auth.interceptors.response.use(function (response) {
 // Any status code that lie within the range of 2xx cause this function to trigger
 // Do something with response data
 // console.log("🚀 ~ file: auth-utils.js:28 ~ auth-utils.js ~ response", response)

 return response;
}, function (error) {
 // Any status codes that falls outside the range of 2xx cause this function to trigger
 // Do something with response error
 console.log("🚀 ~ file: auth-utils.js:34 ~ auth-utils.js ~ error", error)

 if (error?.response?.status === 400 && error?.response?.data?.error?.message === 'EMAIL_EXISTS') {
  return Promise.reject('Email already exists!')
 }

 if (error?.response?.status === 400 && error?.response?.data?.error?.message === ('INVALID_PASSWORD' || 'EMAIL_NOT_FOUND')) {
  return Promise.reject('Somthing went wrong. Please try again with correct credentials!')
 }

 if (error?.response?.status === 400) {
  return Promise.reject('Somthing went wrong. Please try again!')
 }

 const originalConfig = error.config;
 if (error.response.status === 401 && !originalConfig._retry) {
  originalConfig._retry = true;
  setSessionFlash('error_message', 'Session expired, please login agin')
  logout()
 }

 return Promise.reject(error);
});

// ========== CREATE AUTH API SERVICE (FUNCTION BASED) ================ //

// FUNCTION TO MAKE A USER REGISTRATION API REQUEST
export const register = async (email, password, returnSecureToken) => {
 return instance_auth.post(FIREBASE_URL + REGISTER_URL, {
  email,
  password,
  returnSecureToken,
 });
};

// FUNCTION TO MAKE USER LOGOUT CALL
export const logout = () => {
 remove(process.env.REACT_APP_USER_OBJECT_NAME);
 remove(process.env.REACT_APP_AUTH_TOKEN_NAME);
 remove(process.env.REACT_APP_AUTH_EXPIRATION_TIME)
 history.push('/auth')
 history.go('/auth')

};

// FUNCTION TO MAKE USER LOGIN API CALL
export const login = async (email, password, returnSecureToken) => {
 const response = await instance_auth.post(FIREBASE_URL + LOGIN_URL, {
  email,
  password,
  returnSecureToken,
 });
 if (response?.data?.idToken) {
  setStorageToken(response?.data?.idToken);
  setStorageUser(process.env.REACT_APP_USER_OBJECT_NAME, response?.data)
 }

 return response?.data;
};

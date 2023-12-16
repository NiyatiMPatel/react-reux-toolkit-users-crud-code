import axios from 'axios';
import { getStorageUser, getStorageToken, setSessionFlash } from '../helpers/storageService';
import { logout } from './auth-utils';

// ================ AUTHENTICATION TOKEN FUNCTION ================= //
export const authHeader = () => {
 const user = getStorageUser(process.env.REACT_APP_USER_OBJECT_NAME);
 const token = getStorageToken(process.env.REACT_APP_AUTH_TOKEN_NAME);

 if (user && token) {
  return `Bearer ${token}`;
 } else {
  return {};
 }
}
// ====================================================================== //
const USERS_API_URL = process.env.REACT_APP_USERS_API_URL;
//  ===================== CREATE AXIOS USER INSTANCE =================== //
export const instance = axios.create({
 baseURL: USERS_API_URL,
});

//  ================== CREATE AXIOS USER INTERCEPTORS ====================//
// Add a request interceptor
instance.interceptors.request.use(function (request) {
 // Do something before request is sent ==== (CHECK IF HAS TOKEN AND YES THEN ADD HEADER AUTHORIZATION PARAMETER)
 // console.log("🚀 ~ file: axios-utils.js:28 ~ axios-utils.js ~ request", request)

 if (request?.headers?.authorization !== false) {
  const token = getStorageToken(process.env.REACT_APP_AUTH_TOKEN_NAME);
  if (token) {
   request.headers = { 'Content-Type': 'Application/json', 'Accept': 'Application/json', 'Authorization': authHeader() }
  }
 }

 return request;
}, function (error) {
 // Do something with request error
 console.log("🚀 ~ file: axios-utils.js:40 ~ axios-utils.js ~ error", error)

 return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
 // Any status code that lie within the range of 2xx cause this function to trigger
 // Do something with response data
 // console.log("🚀 ~ file: axios-utils.js:49 ~ axios-utils.js ~ response", response)

 const token = getStorageToken(process.env.REACT_APP_AUTH_TOKEN_NAME);
 if (token && response?.config?.headers?.Authorization) {
  return response;
 } else {
  logout()
 }

}, function (error) {
 // Any status codes that falls outside the range of 2xx cause this function to trigger
 // Do something with response error
 console.log("🚀 ~ file: axios-utils.js:62 ~ axios-utils.js ~ error", error)

 if (error?.response?.status === 400 || error?.code === "ERR_NETWORK") {
  setSessionFlash('error_message', 'Something went wrong, please try again!')
 }

 if (error?.response?.status === 401 || error?.code === "EXPIRED_TOKEN") {
  setSessionFlash('error_message', 'Session expired, please login agin')
  logout()
 }

 // In case the request is failed again, and the server continue to return 401 status code, it may go to Infinite loop We use a flag call _retry on original Request (config). _retry is set to true right after the first time we meet 401 status.

 const originalConfig = error?.config;
 if (error?.response?.status === 401 && !originalConfig?._retry) {
  originalConfig._retry = true;
  setSessionFlash('error_message', 'Session expired, please login agin')
  logout()

  // Do something, call refreshToken() request for example;
  // return a request
 }

 return Promise.reject(error);
});

// ========== CREATE USERS API SERVICE (FUNCTION BASED) ================ //

// ========== FUNCTION TO MAKE A "GET" API REQUEST ========== //
export function get(url, data = {}) {
 return instance.get(url, data)
}

// ============ FUNCTION TO MAKE A "POST" API REQUEST ============ //
export function post(url, data) {
 return instance.post(url, data)

}

// ========= FUNCTION TO MAKE A "PUT" API REQUEST ============ //
export function put(url, data) {
 return instance.put(url, data)
}

// ========== FUNCTION TO MAKE A "DELETE" API REQUEST ========== //
export function deletee(url) {
 return instance.delete(url)
}
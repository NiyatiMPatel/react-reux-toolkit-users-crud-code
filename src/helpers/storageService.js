// import { REACT_APP_AUTH_TOKEN_NAME } from "../constants/constants";

// FUNCTION TO SET AUTH-TOKEN IN LOCAL STORAGE
export const setStorageToken = (token) => {
 localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_NAME, token)
}

// FUNCTION TO GET AUTH-TOKEN FROM LOCAL STORAGE
export const getStorageToken = () => {
 return localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_NAME)
}

// FUNCTION TO SET USER OBJECT IN LOCAL STORAGE
export const setStorageUser = (key, object) => {
 localStorage.setItem(key, JSON.stringify(object))
}

// FUNCTION TO GET USER OBJECT FROM LOCAL STORAGE
export const getStorageUser = (item) => {
 return JSON.parse(localStorage.getItem(item) !== null ? localStorage.getItem(item) : null)
}

// FUNCTION TO REMOVE USER OBJECT FROM LOCAL STORAGE
export const remove = (key) => {
 localStorage.removeItem(key)
}

// ================================================================ //

// FUNCTION TO STORE TOKEN'S EXPIRATION TIME CALCULATED
export const setExpirationTime = (key, time) => {
 localStorage.setItem(key, time)
}

// FUNCTION TO GET TOKEN'S EXPIRATION TIME CALCULATED
export const getExpirationTime = (key) => {
 localStorage.getItem(key)
}

// ================================================================ //

// FUNCTION TO SET FLASH MESSAGE INTO BROWSER SESSION STORAGE
export const setSessionFlash = (messageKey, message) => {
 sessionStorage.removeItem(messageKey);
 sessionStorage.setItem(messageKey, message)
}

// FUNCTION TO CHECK IF BROWSER SESSION STORAGE HAS A KEY WITH MESSAGEKEY
export const hasSessionFlash = (messageKey) => {
 return !!sessionStorage.getItem(messageKey)
}

// FUNCTION TO GET FLASH MESSAGE FROM BROWSER SESSION STORAGE
export const getSessionFlash = (messageKey) => {
 const message = sessionStorage.getItem(messageKey);
 sessionStorage.removeItem(messageKey);
 return message
}
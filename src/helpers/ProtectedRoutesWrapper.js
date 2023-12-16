import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getStorageToken } from './storageService';

const ProtectedRouteWrapper = ({ children }) => {

 const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn))

 const token = getStorageToken(process.env.REACT_APP_AUTH_TOKEN_NAME);

 const location = useLocation();

 return isLoggedIn && token ? (
  children
 ) : (
  <Navigate to="/auth" replace state={{ path: location.pathname }} />
 );
};

export default ProtectedRouteWrapper;
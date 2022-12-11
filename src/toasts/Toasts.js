import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from 'react-toastify';

const Toasts = () => {
 const toastPortal = document.getElementById("toasts")
 return (
  <>
   {ReactDOM.createPortal(<ToastContainer />, toastPortal)}
  </>
 )
}
export default Toasts
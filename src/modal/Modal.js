import React, { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancel}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <button onClick={props.onConfirm} className={styles.modalButton}>Yes</button>
        <button onClick={props.onCancel} className={styles.modalButton}>Cancel</button>
      </footer>
    </div>
  );
};

const modalPortal = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, modalPortal)}
      {ReactDOM.createPortal(
        <ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel}>{props.children}</ModalOverlay>,
        modalPortal
      )}
    </Fragment>
  );
};

export default Modal;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AuthForm.module.css';

const AuthForm = () => {
 const [isLogin, setIsLogin] = useState(true);
 const dispatch = useDispatch()

 // const isLogin = useSelector((state) => (state.auth.isLogin))

 const switchAuthModeHandler = () => {
  setIsLogin((prevState) => !prevState);
 };

 // ======== INITIAL VALUES DEFINITION ======== //

 const initialValues = {
  email: "",
  password: "",
 }
 // ======= VALIDATION SCHEMA DEFINITION ====== //
 const validationSchema = Yup.object().shape({
  // EMAIL VALIDATION SCHEMA //
  email: Yup.string().email('Invalid email').required('Required'),

  // PASSWORD VALIDATION SCHEMA //
  password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, '8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character').required('Required'),
 })
 return (
  <section className={styles.auth}>
   <Formik
    // ======== INITIAL VALUES ======== //
    initialValues={initialValues}

    // ======= VALIDATION SCHEMA ====== //
    validationSchema={validationSchema}

    // ======= SUBMIT HANDLER ======== //
    onSubmit={values => {
     // same shape as initial values
     console.log('values', values);
    }}
   >
    <Form>
     <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
     <div className={styles.control}>
      <label htmlFor='email'>Your Email</label>
      <Field type='email' name='email' required />
      <ErrorMessage name="email" component="div" className={styles['error_text']} />
     </div>
     <div className={styles.control}>
      <label htmlFor='password'>Your Password</label>
      <Field type='text' name='password' required />
      <ErrorMessage name="password" component="div" className={styles['error_text']} />
     </div>
     <div className={styles.actions}>
      <button>{isLogin ? 'Login' : 'Create Account'}</button>
      <button
       type='button'
       className={styles.toggle}
       onClick={switchAuthModeHandler}
      >
       {isLogin ? 'Create new account' : 'Login with existing account'}
      </button>
     </div>
    </Form>
   </Formik>
  </section>
 );
};

export default AuthForm;
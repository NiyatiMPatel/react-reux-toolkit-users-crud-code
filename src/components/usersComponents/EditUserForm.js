import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { user, editUser } from '../../redux/userAction'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner from '../../UI/LoadingSpinner'
import styles from './Users.module.css'

const EditUserForm = (props) => {
  const [userDetail, setUserDetail] = useState([])
  const { userId } = props

  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(user(userId));
  }, [dispatch, userId])

  const status = useSelector((state) => (state.users.status))
  const fetchedUser = useSelector((state) => state.users.user)

  useEffect(() => {
    setUserDetail(fetchedUser)
  }, [fetchedUser])

  // ======== INITIAL VALUES DEFINITION ======== //

  const initialValues = {
    firstName: userDetail?.firstName || "",
    lastName: userDetail?.lastName || "",
    email: userDetail?.email || "",
    contact: userDetail?.contact || "",
    age: userDetail?.age || "",
    gender: userDetail?.gender || "",
  }
  // ======= VALIDATION SCHEMA DEFINITION ====== //

  const validationSchema = Yup.object().shape({
    /// NAME VALIDATION SCHEMA //
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    // NAME VALIDATION SCHEMA //
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    // EMAIL VALIDATION SCHEMA //
    email: Yup.string().email('Invalid email').required('Required'),

    // CONTACT VALIDATION SCHEMA //
    contact: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required('Required'),

    // GENDER VALIDATION SCHEMA //
    gender: Yup.string()
      .required('Required'),

    // AGE VALIDATION SCHEMA //
    age: Yup.number()
      .required('Required'),
  });


  const cancelHandler = () => {
    navigate('/users')
  }

  return (
    <>
      {status === 'pending' ? (<LoadingSpinner />) : (
        <>
          <div className='py-5'>
            <h1 className='text-center'>Edit User</h1>
          </div>
          <Formik
            // ======== INITIAL VALUES ======== //
            initialValues={initialValues}

            // ======= VALIDATION SCHEMA ====== //
            validationSchema={validationSchema}

            // ======= REINITIALIZATION ======= //

            enableReinitialize

            // ======= SUBMIT HANDLER ======== //
            onSubmit={values => {
              // same shape as initial values
              dispatch(editUser({ id: userId, data: values })).then(() => navigate('/users'))
            }}

          >

            {({ isSubmitting }) => (
              <Form>
                <div className={styles['form_control']}>
                  <label htmlFor='firstName'>Enter your Firstname: </label>
                  <Field type="text" name="firstName" placeholder='please enter your firstname' id='firstName' />
                  <ErrorMessage name="firstName" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_control']}>
                  <label htmlFor='lastName'>Enter your Lastname: </label>
                  <Field type="text" name="lastName" placeholder='please enter your lastname' id='lastName' />
                  <ErrorMessage name="lastName" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_control']}>
                  <label htmlFor='age'>Enter your Age: </label>
                  <Field type="number" name="age" placeholder='please enter your age' id='age' />
                  <ErrorMessage name="age" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_control']}>
                  <label htmlFor='gender'>Enter your Gender: </label>
                  <Field type="text" name="gender" placeholder='please enter your gender' id='gender' />
                  <ErrorMessage name="gender" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_control']}>
                  <label htmlFor='email'>Enter you Email: </label>
                  <Field type="email" name="email" placeholder='please enter your email' id='email' />
                  <ErrorMessage name="email" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_control']}>
                  <label htmlFor='contact'>Enter you Contact: </label>
                  <Field type="tel" name="contact" placeholder='please enter your contact' id='contact' />
                  <ErrorMessage name="contact" component="div" className={styles['error_text']} />
                </div>

                <div className={styles['form_btn']}>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>

                  <button type="button" onClick={cancelHandler}>
                    Cancel
                  </button>
                </div>

              </Form>
            )}

          </Formik>
        </>
      )}
    </>

  )
}

export default EditUserForm
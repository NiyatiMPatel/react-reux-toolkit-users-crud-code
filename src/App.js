import React, { Suspense } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from 'react-redux';
import Header from './navbar/Header'
// import HomePage from './pages/HomePage'
// import AuthPage from './pages/AuthPage'
// import AddUserPage from './pages/AddUserPage';
// import ListUsersPage from './pages/ListUsersPage';
// import EditUserPage from './pages/EditUserPage'
import LoadingSpinner from './UI/LoadingSpinner';
import Toasts from './toasts/Toasts';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = React.lazy(() => import('./pages/HomePage'))
const AuthPage = React.lazy(() => import('./pages/AuthPage'))
const AddUserPage = React.lazy(() => import('./pages/AddUserPage'))
const ListUsersPage = React.lazy(() => import('./pages/ListUsersPage'))
const EditUserPage = React.lazy(() => import('./pages/EditUserPage'))

function App() {
  const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn))

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <Container>
          <Row>
            <Col>
              <main className='pt-5'>
                <Routes>
                  <Route path="/" element={<Navigate replace to="home" />} />
                  <Route path='home' element={<HomePage />} />
                  {!isLoggedIn && <Route path='auth' element={<AuthPage />} />}
                  {isLoggedIn && (<><Route path="users3" element={<ListUsersPage />} />
                    <Route path="users3/edit-user/:id" element={<EditUserPage />} />
                    <Route path="add-user" element={<AddUserPage />} /></>)}
                </Routes>
              </main>
            </Col>
          </Row>
        </Container>
        <Toasts />
      </Suspense>
    </>
  );
}

export default App;

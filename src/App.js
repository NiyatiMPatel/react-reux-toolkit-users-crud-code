import React, { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from 'react-redux';
import Header from './navbar/Header'
import LoadingSpinner from './UI/LoadingSpinner';
import ProtectedRouteWrapper from './helpers/ProtectedRoutesWrapper';
import Toasts from './toasts/Toasts';
import 'react-toastify/dist/ReactToastify.css';
import { getStorageToken } from './helpers/storageService';

const HomePage = React.lazy(() => import('./pages/HomePage'))
const AuthPage = React.lazy(() => import('./pages/AuthPage'))
const AddUserPage = React.lazy(() => import('./pages/AddUserPage'))
const ListUsersPage = React.lazy(() => import('./pages/ListUsersPage'))
const EditUserPage = React.lazy(() => import('./pages/EditUserPage'))

function App() {
  const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn))
  const token = getStorageToken(process.env.REACT_APP_AUTH_TOKEN_NAME);

  return (

    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <Container>
          <Row>
            <Col>
              <main className='pt-5'>
                <Routes>
                  <Route path="/" element={<Navigate to="home" replace />} />
                  <Route path='/home' element={<HomePage />} />
                  <Route path='/auth' element={<AuthPage />} />
                  <Route path="/users" element={<ProtectedRouteWrapper><ListUsersPage /></ProtectedRouteWrapper>} />
                  <Route path="/users/edit-user/:id" element={<ProtectedRouteWrapper><EditUserPage /></ProtectedRouteWrapper>} />
                  <Route path="add-user" element={<ProtectedRouteWrapper><AddUserPage /></ProtectedRouteWrapper>} />
                  <Route path="*" element={<Navigate to="home" replace />} />
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

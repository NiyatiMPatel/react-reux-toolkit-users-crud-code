import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, Route, Routes } from "react-router-dom"
import Header from './navbar/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import AddUserPage from './pages/AddUserPage';
import ListUsersPage from './pages/ListUsersPage';
import EditUserPage from './pages/EditUserPage'
import Toasts from './toasts/Toasts';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <main className='pt-5'>
              <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route path="users3" element={<ListUsersPage />} />
                <Route path="users3/edit-user/:id" element={<EditUserPage />} />
                <Route path="add-user" element={<AddUserPage />} />
              </Routes>
            </main>
          </Col>
        </Row>
      </Container>
      <Toasts />
    </>
  );
}

export default App;

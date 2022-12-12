import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authAction'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
function Header() {

 const dispatch = useDispatch()

 const navigate = useNavigate()

 const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn))

 const logoutHandler = () => {
  dispatch(logoutUser())
  navigate("/auth", { replace: true })
 }

 return (
  <Navbar bg="light" expand="lg">
   <Container>
    <Navbar.Brand href="home">React-Redux-Toolkit CRUD Operation</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
     <Nav>
      {!isLoggedIn && <NavLink to='auth' className='nav-link'>Login</NavLink>}
      {isLoggedIn && (<><NavLink to='users3' className='nav-link'>Users</NavLink>
       <NavLink to='/add-user' className='nav-link'>Add Users</NavLink>
       <button className='nav-link border-0 bg-transparent' onClick={logoutHandler}>Logout</button></>)}
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}

export default Header;
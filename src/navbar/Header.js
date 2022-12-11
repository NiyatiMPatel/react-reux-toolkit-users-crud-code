import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
function Header() {
 return (
  <Navbar bg="light" expand="lg">
   <Container>
    <Navbar.Brand href="/home">React-Redux-Toolkit CRUD Operation</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
     <Nav>
      <NavLink to='/auth' className='nav-link'>Login</NavLink>
      <NavLink to='/users3' className='nav-link'>Users</NavLink>
      <NavLink to='/add-user' className='nav-link'>Add Users</NavLink>
      <Link className='nav-link'>Logout</Link>
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}

export default Header;
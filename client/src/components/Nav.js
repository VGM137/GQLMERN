import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';
import Search from './Search';

function NavComponent() {

  const {state, dispatch} = useContext(AuthContext)
  let history = useNavigate()
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const {user} = state

  const logout = (e) => {
    const auth = getAuth();
    signOut(auth).then((data) => {
      console.log(data)
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: null
      })
      history('/')
    }).catch((error) => {
      toast.error(`Sorry, there was an error: ${error.errorCode} - ${error.errorMessage}`, options)
    });
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!user &&
              <>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            }
            {user &&
              <>
                <NavDropdown title='User'>
                  <NavDropdown.Item href="/profile">{user.email && user.email.split('@')[0]} </NavDropdown.Item>
                  <NavDropdown.Item href='/post/create'>Post</NavDropdown.Item>
                  <NavDropdown.Item href='/password/update'>Password</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout} href="/login">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
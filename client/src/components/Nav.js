import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

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
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            }
            {user &&
              <>
                <Nav.Link onClick={logout} href="/login">Logout</Nav.Link>
                <Nav.Link href='/create/post'>Post</Nav.Link>
                <Nav.Link href='/password/forgot'>Password</Nav.Link>
              </>
            }
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
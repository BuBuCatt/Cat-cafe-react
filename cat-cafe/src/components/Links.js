import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

export default function Links(props) {
  return (
    <>
        {/* <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/adopt-cat">
              <Nav.Link>Adopt Cat</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cafe">
              <Nav.Link>Cafe</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
           
            {!props.loginUser ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      {/* This Outlet will render the child components/routes */}
      <Outlet />
    </>
  );
}

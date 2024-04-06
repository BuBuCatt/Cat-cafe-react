import React from 'react';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import  '../styles/home.css'


function NavBar(props) {
  return (
    <Navbar bg="light" variant="light" expand="lg" style={{ padding: '10px 50px' }}>
         
      <Navbar.Brand className="mr-auto" >
          <Link to="/home">
              <img 
              
                src={logo}
                width="100"
                height="auto"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mx-auto me-3">
        <Nav.Link as={Link}  to="/home">Home</Nav.Link>
        <Nav.Link as={Link}  to="/adopt">Adopt Cat</Nav.Link>
        <Nav.Link as={Link}  to="/cafe">Cafe</Nav.Link>
        <Nav.Link as={Link}  to="/shop">Shop</Nav.Link>
      </Nav>

      <Form className="search-bar me-3 " >
      <FormControl
        type="text"
        placeholder="Searching"
        className="mr-sm-2 border-2 bg-light "
        
      />
      {/* <Button variant="outline-danger">
        <span role="img" aria-label="search">🔍</span>
      </Button> */}
    </Form>


            <Nav  >
                <Link>
                    <Button  to="/cart" variant="dark" className="me-2">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Button>
                </Link>

                {/* login */}
                    {props.loginUser? ( // true
                       
                      <Link to="/logout">
                        <Button  variant="dark" onClick={() => props.userLogout(null)}>Logout</Button>
                      </Link>
                      
                     

                    ):(
                    
                        <Link to="/login" >
                        <Button  variant="dark">Login</Button>
                      </Link>

                    )
      
                    }
            
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

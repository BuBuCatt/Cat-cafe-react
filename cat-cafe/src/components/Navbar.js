import React, { useContext } from 'react';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart , faHeart } from '@fortawesome/free-solid-svg-icons';
import  '../styles/home.css'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

function NavBar(props) {
  const navigate = useNavigate();
  const { loginUser, checkUserType, setLoginUser } = useContext(AuthContext);
  const userType = checkUserType(loginUser);

  function logout(){
    let request = new FormData();
    request.append("sid",loginUser.sessionID);
    request.append('email',loginUser.email);

    AuthService.logout(request).then(
      (response)=>{
        console.log(response.data);
      },
      (rej)=>{
        console.log(rej && rej.message?rej.message:'Unable to terminate session. Logout just from client-side');
      }
    )
    
    setLoginUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate('/login')
  }

    return (
    <Navbar bg="light" variant="light" expand="lg" style={{ padding: '10px 50px' }}>
         
      <Navbar.Brand className="mr-auto mr-lg-5" >
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

      { loginUser ? (
          <Navbar.Text className="me-2">
            <strong>Welcome, {loginUser && loginUser.username}</strong>
          </Navbar.Text>
        ) : (
          <Navbar.Text className="me-2">
            <strong>Welcome, Guest!</strong>
          </Navbar.Text>
        )}


      <Nav className="mx-auto me-3">
        {userType === "admin" ? (
          <>
          <Nav.Link as={Link}  to="/admin">Dashboard</Nav.Link>
          <Nav.Link as={Link}  to="/adminMenu">Menu</Nav.Link>
          <Nav.Link as={Link}  to="/adminCats">Cats</Nav.Link>
        </>
          ) : (
          <>
            <Nav.Link as={Link}  to="/home">Home</Nav.Link>
            <Nav.Link as={Link}  to="/adopt">Adopt Cat</Nav.Link>
            <Nav.Link as={Link}  to="/cafe">Cafe</Nav.Link>
            <Nav.Link as={Link}  to="/sponsor">Sponsor</Nav.Link>
          </>
          )
        }
      </Nav>

      {/* search bar */}
{/* 
      <Form className="search-bar me-3 " >
      <FormControl
        type="text"
        placeholder="Searching"
        className="mr-sm-2 border-2 bg-light "
      
      
        
      />
      <Button variant="outline-danger">
        <span role="img" aria-label="search">🔍</span>
      </Button>
    </Form> */}


            <Nav className='gap-1' >
                {
                  userType === "admin" ? null : (
                    <>
                    <Link to="/wishlist">
                      <Button variant="dark" className="me-2">
                        <FontAwesomeIcon icon={faHeart} />
                      </Button>
                    </Link>

                    <Link to="/cart">
                        <Button   variant="dark" className="me-2">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </Button>
                    </Link>
                    </>
                  )
                }

                {/* login */}
                    {loginUser? ( // true
                       
                      // <Link to="/logout">
                      // </Link>
                        <Button  variant="dark" onClick={() => logout(loginUser)}>Logout</Button>
                      
                     

                    ):(
                    
                      <>
                      <Link to="/login">
                          <Button variant="dark" className="me-2">Login</Button>
                      </Link>
                      <Link to="/reg">
                          <Button variant="dark">Register</Button>
                      </Link>
                  </>

                    )
      
                    }
            
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
                  
                  }
export default NavBar;

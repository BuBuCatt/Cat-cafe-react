import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert ,Image,Container,Row,Col,InputGroup} from 'react-bootstrap';
import "../styles/LoginPage.css";
import AuthService from '../services/AuthService';
import "../styles/Alert.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Registration = (props) => {
    const [userDetails, setUserDetails] = useState({ username: '', email: '', pass: '' });
    const navigate = useNavigate();
    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");
    const [showPassword, setShowPassword] = useState(false);
 


    useEffect(()=>{
        
        if(msg){
            setTimeout(()=> setMsg(null),5000)
          }
      },[msg]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value  // Updates the value in state, ensuring it's controlled
        }));
    };


    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    const submitHandler = (e) => {
        e.preventDefault();




        const formData = new FormData(e.target);
        formData.append('username', userDetails.username);
        formData.append('email', userDetails.email);
        formData.append('password', userDetails.pass);


        AuthService.register(formData).then(
            (response)=>{
              console.log("Type of response.data:", typeof response.data);
              console.log("Register DATA: " + response.data);

              navigate('/')
            },
            (rej)=>{
              console.log(rej);// Log errors if login fails
              let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                setMsg(msg || 'Unable to retrieve product data. Try again later');
                setAlertType('danger');
            }
          )

        
    };

    return (
        <Container className="d-flex justify-content-center align-items-center login-container" style={{ height: '60vh' }}>
    
        <Form  onSubmit={submitHandler}   className='regForm'> 

            <Row  className="mb-4">
    
                <Col className="d-flex justify-content-center">
                    <Image src="../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
                </Col>
            </Row>
            {msg?(
                <Alert className='alert-msg top' variant={alertType}>{msg}</Alert>
            ) :null
            }
    

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                    
                    required
                />
  
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="pass"
                        value={userDetails.pass}
                        onChange={handleInputChange}
                        required
                    />
        
                    <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} aria-label="Toggle password visibility">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>

                </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
        </Form>
        </Container>
    );
};

export default Registration;

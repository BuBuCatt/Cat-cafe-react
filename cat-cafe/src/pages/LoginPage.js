import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import "../styles/LoginPage.css";
import "../styles/Alert.css"
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function LoginPage(props){

    const [user,setUser] = useState({email:"",pass:""});
    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");
    const navigate = useNavigate(); 

    useEffect(()=>{

      if(msg){
          setTimeout(()=> setMsg(null),5000)
        }
    },[msg,props.loginUser])

    const changeHandler = (e)=>{
        setUser(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const submitHandler = (e)=>{
      e.preventDefault();
      const formData = new FormData(e.target);
      
      AuthService.login(formData).then(
        (response)=>{
          console.log("Type of response.data:", typeof response.data);
          props.auth(response.data)
          console.log("User login from MySQL: " + response.data);
          navigate('/home')
        },
        (rej)=>{
          console.log(rej);// Log errors if login fails
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || 'An error occurred trying to login');
          setAlertType('danger')
        }
      )
    }

  return (
    <Container className="d-flex justify-content-center align-items-center login-container" style={{ height: '60vh' }}>
      {
        msg ? (
          <Alert className='alert-msg' variant={alertType}>{msg}</Alert>
        ) : null
      }
      <Form onSubmit={submitHandler } className="w-50">

        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image src="../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
          </Col>
        </Row>

        {/* email */}
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Email"
            required
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Control
            type="password"
            name="pass"
            value={user.pass}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
        </Form.Group>

     
        
        <div  className="d-flex justify-content-center">
            <Button variant="dark" type="submit" className="w-50">Login</Button>
        </div>
      
 
      </Form>
    </Container>
  );

}
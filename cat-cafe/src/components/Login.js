import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Image, Alert } from 'react-bootstrap';
import axios from 'axios';


const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState({ success: false, message: '' });

  useEffect(() => {
    if (loginStatus.message !== '') {
      // Here you could also perform actions like showing a toast notification
      console.log(loginStatus.message);
    }
  }, [loginStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a login check
    if (credentials.username === 'user' && credentials.password === 'pass') {
      setLoginStatus({ success: true, message: 'Login successful!' });
      // Perform further actions on successful login
    } else {
      setLoginStatus({ success: false, message: 'Login failed. Please check your username and password.' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image src="../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
          </Col>
        </Row>

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </Form.Group>

        {loginStatus.message && (
          <Alert variant={loginStatus.success ? 'success' : 'danger'}>
            {loginStatus.message}
          </Alert>
        )}
        
        <div  className="d-flex justify-content-center">
            <Button variant="dark" type="submit" className="w-50">Login</Button>
        </div>
      
        {/* <Form.Text className="text-muted text-center d-block mt-3">
          Don't have an account? <a href="/signup">Sign up</a>
        </Form.Text> */}
      </Form>
    </Container>
  );
};

export default Login;

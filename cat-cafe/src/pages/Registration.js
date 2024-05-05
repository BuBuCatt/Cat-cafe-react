import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert ,Image,Container,Row,Col} from 'react-bootstrap';
import "../styles/LoginPage.css";

const Registration = (props) => {
    const [userDetails, setUserDetails] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setError('');

    //     // Here you would normally handle the registration request to your backend
    //     try {
    //         const response = await fetch('/api/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(userDetails)
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             props.loginUser(data); // login the user with the received details
    //             navigate('/'); // navigate to home or dashboard on successful registration
    //         } else {
    //             throw new Error('Failed to register. Please try again!');
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };

    return (
        <Container className="d-flex justify-content-center align-items-center login-container" style={{ height: '60vh' }}>
            {/* onSubmit={handleSubmit}      */}
        <Form  className='regForm'> 

            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <Image src="../data/img/meow-match-caf-favicon-black.png" alt="Meow Match Café Logo" roundedCircle />
                </Col>
            </Row>
 
            {error && <Alert variant="danger">{error}</Alert>}
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
        </Form>
        </Container>
    );
};

export default Registration;

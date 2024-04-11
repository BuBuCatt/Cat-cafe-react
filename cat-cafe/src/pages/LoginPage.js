import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  useEffect(() => {
    if (props.IsLogedIn) {
      navigate("/home");
    }
  }, []);

  const [user, setUser] = useState({ email: "", pass: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.auth(user);

    console.log(" login success" + user.email);
    navigate("/home");
  };
  console.log("here is Login" + props.loginUser);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <Form onSubmit={submitHandler} className="w-50">
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Image
              src="../data/img/meow-match-caf-favicon-black.png"
              alt="Meow Match Café Logo"
              roundedCircle
            />
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

        <div className="d-flex justify-content-center">
          <Button variant="dark" type="submit" className="w-50">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
}

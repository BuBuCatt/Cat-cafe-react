import React from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = (props) => {

    const navigate = useNavigate();

    useEffect(()=>{

      // if(props.loginUser == null || props.loginUser.type !== "admin"){
      //   navigate("/");
      // }

    },[]);

  return (
    <Container fluid>
        
      <Row>
        <Col xs={10} id="page-content-wrapper">
          <Container fluid className="pt-4">
            <h1>Welcome to Admin Dashboard</h1>
            <Container fluid>
              <Row className='mb-3'>
                <Col>
                <Link to="/admin/form/cat">
                  <Button  variant="success">Add new cats</Button>
                </Link>
                </Col>
                <Col>
                <Link to="/admin/form/product">
                  <Button  variant="success">Add new products</Button>
                </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                <Link to="/adminCats">
                  <Button  variant="secondary">Edit/remove cats</Button>
                </Link>
                </Col>
                <Col>
                <Link to="/adminMenu">
                  <Button  variant="secondary">Edit/remove products</Button>
                </Link>
                </Col>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

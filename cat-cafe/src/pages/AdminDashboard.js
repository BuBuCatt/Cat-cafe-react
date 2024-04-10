import React from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import {useState,useEffect} from 'react';


const AdminDashboard = () => {

  return (
    <Container fluid>
        
      <Row>
        <Col xs={10} id="page-content-wrapper">
          <Container fluid className="pt-4">
            <h1>Welcome to Admin Dashboard</h1>
        
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

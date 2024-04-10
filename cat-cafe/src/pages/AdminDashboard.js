import React from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = (props) => {

    const navigate = useNavigate();

    useEffect(()=>{

        if(props.loginUser == null){
           

            navigate("/");

        }
        if(props.loginUser && props.loginUser.type != "admin"){
            navigate("/");
        }
        

    },[]);

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

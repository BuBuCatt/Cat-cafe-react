import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../assets/hero-image.jpg'; 

function HeroSection(){

    return(

        <div className="hero-section" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col md={8} className="text-center " style={{ color: 'dark-gray' }}>
              <h1 >Welcome to Meow Match Cafe</h1>
              <p>Discover a cozy and relaxing atmosphere where you can enjoy delicious drinks and spend time with adorable cats.</p>
              <Button variant="light" size="lg">Explore Meow Cafe</Button>
            </Col>
          </Row>
        </Container>
      </div>

    )

}export default HeroSection;
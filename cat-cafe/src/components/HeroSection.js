import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../assets/hero-image.jpg'; 
import "../styles/home.css";


const HeroSection =()=>{

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll down by the height of the viewport
      behavior: 'smooth' // Smooth scroll
    });
  }


    return(

        <div className="hero-section" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col md={8} className="text-center " style={{ color: 'dark-gray' }}>
              <h1 >Welcome to Meow Match Cafe</h1>
              <p>Discover a cozy and relaxing atmosphere where you can enjoy delicious drinks and spend time with adorable cats.</p>
              <Button variant="light" size="lg" onClick={handleClick} className='btn-custom'>Explore Meow Cafe</Button>
            </Col>
          </Row>
        </Container>
       
      </div>

    )
}

export default HeroSection;

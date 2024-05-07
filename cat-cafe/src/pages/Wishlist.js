import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button,Accordion } from 'react-bootstrap';

import "../styles/wishlist.css";
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export default function Wishlist(props) {
  console.log("Wishlist data in component:", props.wishlist); 

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const goHomeHandler = () => {
    navigate('/');
  }

  const goAdoptHandler = () => {
    navigate('/adopt');
  }




  return (
    <>
        <Container className="mt-4 centered-container">
            <h1 className="brown-theme">Adopt Cats Wishlist</h1>
            <div className="mb-3">
                <Button variant="secondary" className="brown-btn" onClick={goHomeHandler}>Back to Home</Button>{' '}
                <Button variant="info" className="brown-btn" onClick={goAdoptHandler}>Go to Cats Page</Button>
            </div>
            <Row className="centered-row">
                {props.wishlist.map(cat => (
                    <Col sm={6} md={4} lg={3} key={cat.cid}>
                        <Card className="mb-4 card-custom">
                            <Card.Img variant="top" src={cat.catImage} alt={cat.catName} />
                            <Card.Body>
                                <Card.Title className="brown-theme">{cat.catName}</Card.Title>
                                <Card.Text className="brown-theme">{cat.catDescription}</Card.Text>
                                <Button variant="danger" className="brown-btn" onClick={() => props.removeFromWishlist(cat.cid)}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* FAQ Section */}

            <Accordion defaultActiveKey="0" className="mt-4 mb-5">
                <h4 className="brown-theme">Adopt Cats FAQ</h4>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is the adoption process?</Accordion.Header>
                  <Accordion.Body>
                    The adoption process involves visiting the shelter, spending time with the cat, and completing our adoption paperwork. We ensure each cat goes to a loving home where they will be well cared for.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How much does it cost to adopt a cat?</Accordion.Header>
                  <Accordion.Body>
                    The adoption fee varies depending on the cat's age, breed, and the shelter's policy. Generally, fees include vaccinations, microchipping, and spaying or neutering.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>What should I bring when adopting a cat?</Accordion.Header>
                  <Accordion.Body>
                    You should bring a valid ID, proof of address, and possibly references. Also, it's a good idea to bring a cat carrier for safely transporting your new pet home.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
   
       
   
        </Container>
        <Footer/>
    </>
  )
}

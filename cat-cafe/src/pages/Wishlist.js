import React, { useContext,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button,Accordion } from 'react-bootstrap';

import "../styles/wishlist.css";
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import DataService from '../services/DataService';
export default function Wishlist(props) {
  const [wishlist, setWishlist] = useState([]);
  //console.log("Wishlist data in component:", props.wishlist); 
  const [msg,setMsg] = useState(null);
  const [alertType,setAlertType] = useState("");
  const [adoptData, setadoptData] = useState(props.cats); // get the whole data from the props cats

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  
    useEffect(() => {
      reloadData();
      //setWishlist(props.wishlist);
    }, []);

  const goHomeHandler = () => {
    navigate('/');
  }

  const goAdoptHandler = () => {
    navigate('/adopt');
  }

  const reloadData = () => {

    DataService.getData("getCats").then(
      (response)=>{
        console.log("WishList PAGE data: ", response.data);
        setadoptData(response.data);
      },
      (rej)=>{
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || "An error occurred while loading cats data.");
          setAlertType('danger');
      }
    )
    console.log("RELOAD " + loginUser);
    let user = loginUser;
    if(!loginUser){
        user = JSON.parse(localStorage.getItem('user'));
    } 

   
    if(user){
      console.log("RELOAD ID " + user.id);
        DataService.searchData("whishlist",user.id).then(
            (response)=>{
              console.log("Wishlist data in component:", response);//get the response data
            setWishlist(response.data);
           
    

            },
            (rej)=>{
                let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                setMsg(msg || "An error occurred while reloading the data.");
                setAlertType('danger');
            }
        )
      }

 




  }

//wrong function
  const removeItem = (id) => {
    if(loginUser){
        alert(loginUser.id)
        alert(loginUser.sessionID)
        DataService.removeData(loginUser.id, loginUser.sessionID, id).then(
            (response)=>{
                setMsg(response.data);
                setAlertType('primary');
                reloadData();
                // removeItemFunction(id);
            },
            (rej)=>{
                console.log(rej);// Log errors if file reading fails
                let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                setMsg(msg || "An error occurred while removing the item.");
                setAlertType('danger');
            }
        )
    }
}



  useEffect(() => {
    reloadData();
}, []);







  return (
    <>
        <Container className="mt-4 centered-container">
            <h1 className="brown-theme">Adopt Cats Wishlist</h1>
            <div className="mb-3">
                <Button variant="secondary" className="brown-btn" onClick={goHomeHandler}>Back to Home</Button>{' '}
                <Button variant="info" className="brown-btn" onClick={goAdoptHandler}>Go to Cats Page</Button>
            </div>
            <Row className="centered-row">
                {wishlist.map(cat => (
                    <Col sm={6} md={4} lg={3} key={cat.cid}>
                        <Card className="mb-4 card-custom">
                            <Card.Img variant="top" src={cat.catImage} alt={cat.catName} />
                            <Card.Body>
                                <Card.Title className="brown-theme">{cat.catName}</Card.Title>
                                <Card.Text className="brown-theme">{cat.catDescription}</Card.Text>
                                <Button variant="danger" className="brown-btn" onClick={() => removeItem(cat.cid)}>
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

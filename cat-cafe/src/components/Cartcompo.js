import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap';

export default function Cartcompo({ carts,removeItem, resetCart }){

    console.log("Here is cart compo: " + carts);
    console.log("Here is cart compo: " + JSON.stringify(carts, null, 2));

    console.log("carts: ", carts);
console.log("carts.cart: ", carts?.cart);
    carts.cart && carts.cart.forEach(item => {
        console.log("item: ", item);
        console.log("item.menuName: ", item.menuName);
        console.log("item.menuPrice: ", item.menuPrice);
    });

    const navigate = useNavigate();

    const saveHandler = ()=>{
        carts.toSave();
        alert("Cart saved!!!!!!:D");
    }

    const goHomeHandler = () => {
        navigate("/"); // Navigate to the home page
    }

    const totalCost = carts.cart.reduce((total, item) => total + (item.price * item.amount), 0);


    return(
        <>
    <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Your Cart</h2>
                        <div>
                            <Button variant="primary" onClick={saveHandler} className="me-2">
                                Save Cart
                            </Button>
                            <Button variant="secondary" onClick={goHomeHandler}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                    <Table hover>
                        <thead className="table-light">
                            <tr>
                               
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.cart && carts.cart.length > 0 ? carts.cart.map((item, index) => (
                                <tr key={index}>
                                   
                                    <td>{item.pname}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.amount}</td>
                                    <td>${(item.price * item.amount).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => removeItem(item.mid)}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No items in cart</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-grid gap-2 w-50 mx-auto">
                        <Alert variant="secondary">Total: ${totalCost.toFixed(2)}</Alert>
                        <Button variant="primary" onClick={resetCart}>Reset Cart</Button>
                    </div>
                </Col>
            </Row>
        </Container>
</>

    )
  
 
}
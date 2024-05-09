import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import CartService from "../services/CartService";
import '../styles/Alert.css';
import CartObj, { ProductObj } from "../classes/Cart";
import { AuthContext } from "../context/AuthContext";

export default function Cartcompo({ carts }){

    const { loginUser } = useContext(AuthContext);
    const [cart, setCart] = useState(carts);
    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");

    const navigate = useNavigate();

    const goHomeHandler = () => {
        navigate("/"); // Navigate to the home page
    }

    const addProductObj = (productObj)=>{
        setCart((prevCart)=>{
            prevCart.addProduct(productObj);
            
            return prevCart;
        });
    
    }
    
    const addSponsor = (productObj)=>{
        setCart((prevCart)=>{
            prevCart.addSponsorProduct(productObj);
            
            return prevCart;
        });
    }

    const resetCartFunction = () => {
        setCart(prevCart => {
            prevCart.removeProduct();
            return new CartObj(prevCart.uid);
        });
    }

    function updateQuantity(mid, change) {
        setCart((prevCarts) => {
            return {
                ...prevCarts,
                cart: prevCarts.cart.map(item => 
                    item.mid === mid ? { ...item, amount: Math.max(1, item.amount + change) } : item
                )
            };
        });
    }

    // const incrementQuantity = (mid) => {
    //     // updateQuantity(mid, 1); // Assuming updateQuantity handles increment by 1
    // };
    
    // const decrementQuantity = (mid) => {
    //     // updateQuantity(mid, -1); // Assuming updateQuantity handles decrement by 1
    // };

    
    // const removeItemFunction = (id) => {
    //     setCart(prevCart => {
    //         const newCart = new CartObj(prevCart.uid);
        
    //         prevCart.cart.forEach((product, key) => {
    //             console.log("This is key" + key);
    //             if (key !== id ) {
    //                 newCart.addProduct(new ProductObj(key, product.pname, product.price, product.amount));
    //             }
    //         });
        
    //         return newCart;
    //     });
    // }
    
    // const saveHandler = ()=>{
    //     carts.toSave();
    //     alert("Cart saved!!!!!!:D");
    // }

    // console.log("Here is cart compo: " + carts);
    // console.log("Here is cart compo: " + JSON.stringify(carts, null, 2));

    // console.log("carts: ", carts);
    // console.log("carts.cart: ", carts?.cart);
    // carts.cart && carts.cart.forEach(item => {
    //     console.log("item: ", item);
    //     console.log("item.menuName: ", item.menuName);
    //     console.log("item.menuPrice: ", item.menuPrice);
    // });

    useEffect(()=>{
        reloadData();

        if(msg){
            // setTimeout(()=> setMsg(null),5000)
        }
    },[msg])

    const reloadData = () => {
        let user = loginUser;
        if(!loginUser){
            user = JSON.parse(localStorage.getItem('user'));
        } 
        
        if(user) {
            CartService.getCart(user.id, user.sessionID).then(
                (response)=>{
                  setCart(new CartObj(user.id));
                  console.log('Cart from sql: '+response.data)
                  response.data.forEach(prod => {
                    if(prod.mid){
                      let productObj = new ProductObj(prod.id, prod.mid, null, prod.pname, prod.price, prod.amount); // Create a new product object
                      addProductObj(productObj);
                    } else {
                      let productObj = new ProductObj(prod.id, null, prod.sid, prod.pname, prod.price, prod.amount); // Create a new product object
                      addSponsor(productObj);
                    }
                  })
                },
                (rej)=>{
                    let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                    console.log(msg || "An error occurred while getting cart data.");
                }
            )
        }
    }

    const removeItem = (id) => {
        if(loginUser){
            CartService.removeCartItem(loginUser.id, loginUser.sessionID, id).then(
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
    
    const resetCart = () => {
        if(loginUser){
            CartService.resetCart(loginUser.id, loginUser.sessionID).then(
                (response)=>{
                    setMsg(response.data);
                    setAlertType('primary');
                    resetCartFunction();
                    reloadData();
                },
                (rej)=>{
                    console.log(rej);// Log errors if file reading fails
                    setMsg(rej.response.data || "An error occurred while getting the cats from database.");
                    setAlertType('danger');
                }
            )
        }
    }

    const updateItemQuantity = (item, quantity) => {
        let newQuantity = item.amount + quantity;

        if(newQuantity === 0){
            removeItem(item.id)
        }else{
            if(loginUser){
                let request = new FormData();
                request.append("uid",loginUser.id);
                request.append("sid",loginUser.sessionID);
                request.append("cid",item.id);
                request.append("amount",newQuantity);

                CartService.changeQuantity(request).then(
                    (response)=>{
                        setMsg(response.data);
                        setAlertType('primary');
                        reloadData();
                    },
                    (rej)=>{
                        let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
                        setMsg(msg || "An error occurred while updating item quantity.");
                        setAlertType('danger');
                    }
                )
            }
        }
    }
    
    const totalCost = cart? cart.cart.reduce((total, item) => total + (item.price * item.amount), 0): 0;

    return(
        <>
    {
        msg ? (
          <Alert className='alert-msg top' variant={alertType}>{msg}</Alert>
        ) : null
    }

    <Container className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Your Cart</h2>
                        <div>
                            {/* <Button variant="primary" onClick={saveHandler} className="me-2">
                                Save Cart
                            </Button> */}
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
                                <th>Amount</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart && cart.cart && cart.cart.length > 0 ? cart.cart.map((item, index) => (
                                <tr key={index}>
                                   
                                    <td>{item.pname}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                            <Button variant="outline-secondary" size="sm" onClick={() => updateItemQuantity(item,-1)}>-</Button>
                                            {' '}
                                            {item.amount}
                                            {' '}
                                            <Button variant="outline-secondary" size="sm" onClick={() => updateItemQuantity(item,1)}>+</Button>
                                        </td>
                                    <td>{item.amount} </td>
                                    <td>${(item.price * item.amount).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
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
                        <Button variant="primary" onClick={()=> resetCart()}>Reset Cart</Button>
                    </div>
                </Col>
            </Row>
        </Container>
</>

    )
  
 
}
import React from 'react'
import { ProductObj } from '../classes/Cart'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil , faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Container,Row, Col, Alert } from 'react-bootstrap';
import PopupWindow from './PopWindow';
import DataService from '../services/DataService';
import '../styles/Alert.css'

export default function Menu(props) {

    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");
    
    useEffect(()=>{

      if(msg){
          setTimeout(()=> setMsg(null),5000)
        }
    },[msg,props.loginUser])
    const addHandler = (item) => {


      console.log("Product details : " + item.mid, item.menuName, item.menuPrice);
      console.log("item obj" + item);
      const productObj = new ProductObj(item.mid, item.menuName, item.menuPrice); // Create a new product object
      props.addProObj(productObj); // Call the function passed via props

      console.log("added coffee name ." +item.menuName);
      console.log("added coffee obj name"+productObj.pname)

      console.log("cart item " + props.cart.cart);

        // If props.cart and props.cart.cart exist, log them
        if (props.cart && props.cart.cart) {
          console.log("Cart items:", props.cart.cart);
        } else {
          console.log("Cart or cart items are undefined");
        }
    };

    const removeItem = (item) => {
      DataService.removeData("removeProduct",item.mid).then(
        (response)=>{
            console.log("Products data from mysql : " + response.data);

            setMsg(response.data);
            setAlertType('primary');
            // window.location.reload();
        },
        (rej)=>{
            console.log(rej);// Log errors if file reading fails
            // setMsg(rej.response.data || "An error occurred while getting the cats from database.");
            console.log(rej)
            setMsg( "An error occurred while getting the cats from database.");
            setAlertType('danger');
        }
    )
    }


  return (
    <>
    {
        msg ? (
          <Alert variant={alertType} className='alert-msg'>{msg}</Alert>
        ) : null
    }
    <div className="container mt-5">
      <div className="row">
        {props.menu&&props.menu.map((item) => (
          <div key={item.mid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img src={item.menuImage} className="card-img-top" alt={item.menuName} />
                {
                  props.type === 'edit' ? (
                    <Container className='mt-2'>
                      <Row>
                        <Col>
                          <Link to={"/product-form/"+item.mid}>
                            <Button   variant="dark" className="me-2">
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                          </Link>
                        </Col>
                        <Col>
                          <PopupWindow message={`Are you sure you want to delete ${item.menuName}?`} onConfirm={()=>{removeItem(item)}} />
                        </Col>
                      </Row>
                    </Container>
                  ) : null
                }
              <div className="card-body">
                <h5 className="card-title">{item.menuName}</h5>
                <p className="card-text">{item.menuDescription}</p>
                <div className="d-flex flex-column justify-content-between align-items-center">
                <span className="text-muted">${item.menuPrice}</span>
                  {
                    props.type === 'order' ? (
                      <button className="btn btn-primary" onClick={()=>{addHandler( item)}}>Order Now</button>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  )
}

import React from 'react'
import { ProductObj } from '../classes/Cart'
import { useState } from 'react';

export default function Menu(props) {

 


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

  return (
    <>
    <div className="container mt-5">
      <div className="row">
        {props.menu&&props.menu.map((item) => (
          <div key={item.mid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img src={item.menuImage} className="card-img-top" alt={item.menuName} />
              <div className="card-body">
                <h5 className="card-title">{item.menuName}</h5>
                <p className="card-text">{item.menuDescription}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary" onClick={()=>{addHandler( item)}}>Order Now</button>
                  <span className="text-muted">${item.menuPrice}</span>
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

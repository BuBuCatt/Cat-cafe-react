// src/pages/ShoppingCart.js
import React from 'react';

import Cartcompo from '../components/Cartcompo';
import Footer from '../components/Footer';

const ShoppingCart = (props) => {
  return (

    <>
    {
      props.loginUser ? 
      <Cartcompo  carts={props.shoppingCart} loginUser={props.loginUser}/>
      : <p className='text-center my-2 mx-auto'>Please login to access your cart</p>
    }
    <Footer/>

    </>
  
  );
}

export default ShoppingCart;

// src/pages/ShoppingCart.js
import React from 'react';

import Cartcompo from '../components/Cartcompo';
import Footer from '../components/Footer';

const ShoppingCart = (props) => {
  return (

    <>

   

    <Cartcompo  carts={props.shoppingCart} removeItem={props.removeItem} resetCart={props.resetCart} updateQuantity={props.updateQuantity}/>
    <Footer/>

    </>
  
  );
}

export default ShoppingCart;

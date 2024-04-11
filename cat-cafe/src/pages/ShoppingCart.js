// src/pages/ShoppingCart.js
import React from 'react';

import Cartcompo from '../components/Cartcompo';

const ShoppingCart = (props) => {
  return (

    <>

   

    <Cartcompo  carts={props.shoppingCart} removeItem={props.removeItem} resetCart={props.resetCart} updateQuantity={props.updateQuantity} />


    </>
  
  );
}

export default ShoppingCart;

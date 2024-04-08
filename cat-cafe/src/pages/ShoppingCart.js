// src/pages/ShoppingCart.js
import React from 'react';

import Cartcompo from '../components/Cartcompo';

const ShoppingCart = (props) => {
  return (

    <>

      <div>
      <h1>Shopping Cart</h1>
 
    </div>

    <Cartcompo  carts={props.shoppingCart} removeItem={props.removeItem} resetCart={props.resetCart} />


    </>
  
  );
}

export default ShoppingCart;

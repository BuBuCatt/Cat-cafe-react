// src/pages/ShoppingCart.js
import React, { useContext } from 'react';

import Cartcompo from '../components/Cartcompo';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const ShoppingCart = (props) => {
  const { loginUser } = useContext(AuthContext);
  return (

    <>
    {
      loginUser ? 
      <Cartcompo  carts={props.shoppingCart}/>
      : <p className='text-center my-2 mx-auto'>Please login to access your cart</p>
    }
    <Footer/>

    </>
  
  );
}

export default ShoppingCart;

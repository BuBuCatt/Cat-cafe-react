// src/pages/Menu.js
import React from 'react';
import Menu from '../components/Menu';

const Cafe = (props) => {

  // const addProObj = (props.addProObj !== null && props.addProObj) || (() => console.warn('addProObj is not defined'));
  return (

    <>


        <div>
              
              <h1>Menu Page</h1>
              <p>Check out our delicious menu!</p>
              
        </div>

        <Menu menu={props.menu} addProObj={props.addProObj} cart={props.shoppingCart}/>

 
    </>
   
  );
}

export default Cafe;

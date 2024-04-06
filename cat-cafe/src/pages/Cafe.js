// src/pages/Menu.js
import React from 'react';
import Menu from '../components/Menu';

const Cafe = (props) => {
  return (

    <>


        <div>
              <h1>Menu Page</h1>
              <p>Check out our delicious menu!</p>
              
        </div>

        {/* check if props.menu exists ? if yes render the Menu component(true) : if NO show loading menu text(false)  
        because we did the read file in app.js at the begin to store in menu state  */}

        {props.menu ? <Menu menu={props.menu} /> : <p>Loading menu...</p>}
    </>
   
  );
}

export default Cafe;

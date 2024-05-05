import React from 'react';
import Menu from '../components/Menu';


const AdminMenu = (props) => {


    return (
        <>
            <Menu menu={props.menu} addProObj={props.addProObj} cart={props.shoppingCart} type='edit'/>
        </>
    );
}

export default AdminMenu;

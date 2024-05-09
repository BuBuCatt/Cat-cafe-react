import React, {useState,useEffect, useContext} from 'react'
import '../styles/Alert.css'
import {Alert} from 'react-bootstrap';
import CartService from '../services/CartService';
import { AuthContext } from '../context/AuthContext';


export default function Menu(props) {
    const [msg,setMsg] = useState(null);
    const [alertType,setAlertType] = useState("");
    const { loginUser } = useContext(AuthContext);

    useEffect(()=>{

      if(msg){
          // setTimeout(()=> setMsg(null),5000)
      }
  },[msg])

    const addHandler = (item) => {              
      if(!loginUser && !localStorage.getItem('user')){
        setMsg('You need to login to add to your cart');
        setAlertType('warning');
      } else {
        let user = loginUser? loginUser : JSON.parse(localStorage.getItem('user'));

        let itemData = new FormData();
        alert(loginUser.id);
        alert(item.mid);

       
        itemData.append("uid",user.id)
        itemData.append("sid",user.sessionID)
        itemData.append("mid",item.mid)
        itemData.append("amount",1)
        itemData.append("pname",item.menuName)
  
        CartService.addItem(itemData).then(
          (response)=>{
            setMsg(response.data);
            setAlertType('primary');
          },
          (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while trying to add item to user cart.");
            setAlertType('danger');
          }
        )

      }
      // console.log("Product details : " + item.mid, item.menuName, item.menuPrice);
      // console.log("item obj" + item);
      // const productObj = new ProductObj(item.mid, item.menuName, item.menuPrice); // Create a new product object
      // props.addProObj(productObj); // Call the function passed via props

      // console.log("added coffee name ." +item.menuName);
      // console.log("added coffee obj name"+productObj.pname)

      // console.log("cart item " + props.cart.cart);

        // If props.cart and props.cart.cart exist, log them
        // if (props.cart && props.cart.cart) {
        //   console.log("Cart items:", props.cart.cart);
        // } else {
        //   console.log("Cart or cart items are undefined");
        // }
    };

  return (
    <>
    {
        msg ? (
          <Alert className='alert-msg bottom' variant={alertType}>{msg}</Alert>
        ) : null
    }
    <div className="container mt-5">
      <div className="row">
        {props.menu&&props.menu.map((item) => (
          <div key={item.mid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img src={item.menuImage} className="card-img-top" alt={item.menuName} />
              <div className="card-body">
                <h5 className="card-title">{item.menuName}</h5>
                <p className="card-text">{item.menuDescription}</p>
                <span className="text-muted">${item.menuPrice}</span>
                <div className="d-flex flex-column justify-content-between align-items-center mt-2">
                  <button className="btn btn-primary" onClick={()=>{addHandler( item )}}>Order Now</button>
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

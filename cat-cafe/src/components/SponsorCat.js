import React, { useState, useEffect, useContext } from 'react';
import "../styles/sponsor.css";
import {Alert} from 'react-bootstrap';
import "../styles/Alert.css"
import CartService from '../services/CartService';
import { AuthContext } from '../context/AuthContext';

const SponsorCat = ({addProductObj}) => {
  const [msg,setMsg] = useState(null);
  const [alertType,setAlertType] = useState("");
  const { loginUser } = useContext(AuthContext);

  // console.log('Received addProductObj:', addProductObj);

  useEffect(()=>{
      if(msg){
          // setTimeout(()=> setMsg(null),5000)
      }
  },[msg])
 

  const [selectedAmount, setSelectedAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    //check if user is login to perform action
    if(!loginUser && !localStorage.getItem('user')){
      setMsg('You need to login to add to your cart');
      setAlertType('warning');
    } else {
      let user = loginUser? loginUser : JSON.parse(localStorage.getItem('user'));
      //create request to send data to backend
      let sponsorObj = new FormData();
      sponsorObj.append("uid",user.id)
      sponsorObj.append("sid",user.sessionID)
      sponsorObj.append("value",selectedAmount)
      sponsorObj.append("amount",quantity)
      sponsorObj.append("type", 'overwrite')
  
      CartService.addItem(sponsorObj).then(
        (response)=>{
          setMsg(response.data);
          setAlertType('primary');
          // console.log("Creating product with:", { mid: Date.now(), menuName: 'Sponsor Cat', menuPrice: 1, amount: 1 });
          // const product = new ProductObj(Date.now(), 'Sponsor Cat', selectedAmount, quantity);
      
          // console.log("Created product object:", product);
          
          // addProductObj(product);
          // console.log('Product added to cart:', product);
  
        },
        (rej)=>{
          let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
          setMsg(msg || "An error occurred while trying to add item to user cart.");
          setAlertType('danger');
        }
      )
    }
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => 
      increment ? Math.min(prevQuantity + 1, 10) : Math.max(prevQuantity - 1, 1) // Assuming 10 is the max quantity
    );
  };

  return (
    <div className="container mt-5">
      {
        msg ? (
          <Alert className='alert-msg top' variant={alertType}>{msg}</Alert>
        ) : null
    }
      <div className="row align-items-center spn-cat-container">
        <div className="col-md-6 mb-4 ">
          <img src="./data/img/Tabby-06.jpg" alt="Sponsor Cat" className="img-fluid sponsor-cat-img" />
        </div>
        <div className="col-md-6">
          <h2>Sponsor Our Cats</h2>
          <p className="text-secondary amount-text ">{selectedAmount}.00 CAD</p>
          <div>
            <span className='amount-title'>Amount</span>
            <div className="my-2">
              {/* Amount Buttons */}
              {[1, 3, 5, 10, 20,30, 50,100].map((amount) => (
                <button 
                  key={amount} 
                  className={`btn ${selectedAmount === amount ? 'btn-secondary' : 'btn-outline-secondary'} mx-1 `} 
                  onClick={() => handleAmountSelect(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
          <div className="my-4">
            <span className='quantity-title'>Quantity</span>
            <div className="input-group w-50 my-2">
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(false)}>-</button>
              <input type="text" className="form-control text-center " value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(true)}>+</button>
            </div>
          </div>
          <button className="btn btn-primary w-50   my-2  add-to-cart-btn " onClick={handleAddToCart}>Add to cart</button>
          
        </div>
      </div>
    </div>
  );
};

export default SponsorCat;
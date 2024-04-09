import React, { useState } from 'react';
import "../styles/sponsor.css";
import { ProductObj } from '../classes/Cart';
import { useNavigate } from 'react-router-dom';

const SponsorCat = ({addProductObj}) => {

  const navigate = useNavigate();

  console.log('Received addProductObj:', addProductObj);


 

  const [selectedAmount, setSelectedAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const backToHome =()=>{

    navigate('/');
    
  }


  const handleAddToCart = () => {
    console.log("Creating product with:", { mid: Date.now(), menuName: 'Sponsor Cat', menuPrice: 1, amount: 1 });
    const product = new ProductObj(Date.now(), 'Sponsor Cat', selectedAmount, quantity);

    console.log("Created product object:", product);
    
    addProductObj(product);
    console.log('Product added to cart:', product);
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
            <span>Quantity</span>
            <div className="input-group w-50 my-2">
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(false)}>-</button>
              <input type="text" className="form-control text-center " value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(true)}>+</button>
            </div>
          </div>
          <button className="btn btn-primary w-50 my-2  " onClick={handleAddToCart}>Add to cart</button>
          
        </div>
      </div>
      <div>
      <button className="btn btn-cute btn-primary w-20 my-2 " onClick={backToHome}>Back To Home</button>
      </div>
      
    </div>
  );
};

export default SponsorCat;

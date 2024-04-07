import React, { useState } from 'react';
import "../styles/sponsor.css";

const SponsorCat = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);

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
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img src="./data/img/Tabby-06.jpg" alt="Sponsor Cat" className="img-fluid sponsor-cat-img" />
        </div>
        <div className="col-md-6">
          <h2>Sponsor Our Cats</h2>
          <p className="text-secondary">{selectedAmount}.00 CAD</p>
          <div>
            <span>Amount</span>
            <div className="my-2">
              {/* Amount Buttons */}
              {[1, 3, 5, 10, 20, 50, 100].map((amount) => (
                <button 
                  key={amount} 
                  className={`btn ${selectedAmount === amount ? 'btn-secondary' : 'btn-outline-secondary'} mx-1`} 
                  onClick={() => handleAmountSelect(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
          <div className="my-4">
            <span>Quantity</span>
            <div className="input-group w-50">
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(false)}>-</button>
              <input type="text" className="form-control text-center " value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(true)}>+</button>
            </div>
          </div>
          <button className="btn btn-primary w-50 my-2 ">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCat;

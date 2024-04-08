import React from 'react';
import { Link } from 'react-router-dom'; 

import  '../styles/home.css'



export default function CatList({cats}) {
// Filter the cats array to get only the available cats
  const availableCats = cats ? cats.filter(cat => cat.adoptionStatus === 'Available') : [];

  console.log("availableCats :  ", availableCats.map(cat => cat.catName));

  // Get the first three available cats
  const firstThreeCats = availableCats.slice(0, 3);



  return (
    <>
    <h1 className="text-center mt-5 catlist-title">Adopt a Furry Friend Today</h1>      
    <div className="container mt-5">
          <div className="row cat-list">
            {cats ? firstThreeCats.map((cat) => (
              <div key={cat.cid} className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                <div className="card">
                  <img src={cat.catImage} className="card-img-top" alt={cat.catName} style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{cat.catName}</h5>
                    <span className={`badge ${cat.adoptionStatus === 'Available' ? 'bg-success' : 'bg-secondary'}`}>{cat.adoptionStatus}</span>
                  
                  </div>
                </div>
              </div>
            
            )) : 'Loading...'}
          </div>

            <div className="text-center mt-1">
              <Link to="/adopt" className="btn btn-custom">View More</Link> 
            </div>
        </div>
        
    
    
    
    
    
    
    
    
    
    </> 
    )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Wishlist(props) {
  console.log("Wishlist data in component:", props.wishlist); 

  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate('/');
  }

  const goAdoptHandler = () => {
    navigate('/adopt');
  }




  return (
    <>
      <div className="h1">Adopt Cats Wishlist</div>
      <button type="button" className="btn btn-secondary mb-3" onClick={goHomeHandler}>Back to Home</button>
      <button type="button" className="btn btn-secondary mb-3" onClick={goAdoptHandler}> cats page</button>

      <div className="row">
          {props.wishlist.map(cat => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={cat.cid}>
              <div className="card">
                <img src={cat.catImage} className="card-img-top" alt={cat.catName} />
                <div className="card-body">
                  <h5 className="card-title">{cat.catName}</h5>
                  <p className="card-text">{cat.catDescription}</p>
                  <button onClick={() => props.removeFromWishlist(cat.cid)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

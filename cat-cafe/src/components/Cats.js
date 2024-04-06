import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import  { useState } from 'react';

export default function Cats({cats}) {

    const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
          // Add to favorites
          localStorage.setItem(cats.id, JSON.stringify(cats));
        } else {
          // Remove from favorites
          localStorage.removeItem(cats.id);
        }
      
      };
      

  return (
    <>
        <div className="container mt-5">
        <div className="row">
            {cats.map((cat) => (
            <div key={cat.cid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                <img src={cat.catImage} className="card-img-top" alt={cat.catName} />
                <div className="card-body">
                    <h5 className="card-title">{cat.catName}</h5>
                    <p className="card-text">
                    <strong>Breed:</strong> {cat.catBreed}<br />
                    <strong>Age:</strong> {cat.cataAge}<br />
                    <strong>Description:</strong> {cat.catDescription}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${cat.adoptionStatus === 'Available' ? 'bg-success' : 'bg-secondary'}`}>{cat.adoptionStatus}</span>
                    {/* <a href="#" className="btn btn-primary">Adopt</a> */}
                    <button className="favorite-btn"  onClick={() => toggleFavorite(cat)}  aria-label="Toggle Favorite" disabled={cat.adoptionStatus === 'Adopted'}>
                        <FontAwesomeIcon icon={isFavorited ? fasHeart : farHeart} color={isFavorited ? "red" : "grey"} />
                    </button>
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

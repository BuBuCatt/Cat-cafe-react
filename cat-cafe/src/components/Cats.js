import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import  { useState,useEffect } from 'react';

export default function Cats({cats, addToWishlist ,removeFromWishlist}) {

  

      const [favoritedCats, setFavoritedCats] = useState(() => {
        // Load favorited cats from localStorage
        const saved = localStorage.getItem("favoritedCats");
        console.log("Loaded from localStorage:", saved);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
      // Save to localStorage when favoritedCats changes
      localStorage.setItem("favoritedCats", JSON.stringify(favoritedCats));
  }, []);

  const toggleFavorite = (cat) => {
    const isCurrentlyFavorited = favoritedCats[cat.cid];
    const updatedFavoritedCats = {
        ...favoritedCats,
        [cat.cid]: !isCurrentlyFavorited
    };
    setFavoritedCats(updatedFavoritedCats);
    localStorage.setItem("favoritedCats", JSON.stringify(updatedFavoritedCats));

        if (!isCurrentlyFavorited) {
          addToWishlist(cat);
          }else {
            removeFromWishlist(cat.cid);
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
                    {cat.adoptionStatus === 'Available' && (
                        <button className="favorite-btn" onClick={() => toggleFavorite(cat)} aria-label="Toggle Favorite">
                            <FontAwesomeIcon icon={favoritedCats[cat.cid] ? fasHeart : farHeart} color={favoritedCats[cat.cid] ? "red" : "black"} />
                        </button>
                    )}
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

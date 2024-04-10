import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import  { useState,useEffect } from 'react';
import "../styles/cats.css";
import Footer from './Footer';
import Dropdown from 'react-bootstrap/Dropdown';



export default function Cats({cats, addToWishlist ,removeFromWishlist}) {

    const [filter, setFilter] = useState('All');

      const [favoritedCats, setFavoritedCats] = useState(() => {
        // Load favorited cats from localStorage
        const saved = localStorage.getItem("favoritedCats");
        console.log("Loaded from localStorage:", saved);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
      // Save to localStorage when favoritedCats changes
      localStorage.setItem("favoritedCats", JSON.stringify(favoritedCats));
        // Clear localStorage when the page is unloaded
        const handleBeforeUnload = () => localStorage.removeItem("favoritedCats");
        window.addEventListener("beforeunload", handleBeforeUnload);
          // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
        
  }, [favoritedCats]);

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



    const filteredCats = cats.filter(cat => {
        return filter == 'All' || cat.catBreed == filter;
    });


  return (
    <>
        
        <div className="container mt-5">

                <div className="filter-controls mb-4  ">
                    <label className='breed-filter'>
                        Filter by Breed:
                    </label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="brown-bg">
                        {filter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setFilter('All')}>All</Dropdown.Item>
                        {Array.from(new Set(cats.map(cat => cat.catBreed))).map(breed => (
                            <Dropdown.Item key={breed} onClick={() => setFilter(breed)}>{breed}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
        
        <div className="row row-container">
            {filteredCats.map((cat) => (
            <div key={cat.cid} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                <img src={cat.catImage} className="card-img-top cat-img" alt={cat.catName} />
                <div className="card-body">
                    <h5 className="card-title cat-name ">{cat.catName}</h5>
                    <p className="card-text cat-details">
                        <strong className='cat-detail-title'>Breed:</strong> {cat.catBreed}<br />
                        <strong className='cat-detail-title'>Age:</strong> {cat.cataAge}<br />
                        <strong className='cat-detail-title'>Description:</strong> {cat.catDescription}
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

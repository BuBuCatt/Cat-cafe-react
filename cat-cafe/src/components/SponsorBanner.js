import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const SponsorBanner = () => {
  let navigate = useNavigate(); // Hook to navigate to different routes

  const goToSponsorPage = () => {
    navigate('/sponsor'); 
  };

  return (

    <>

    <h1 className="text-center mt-5">Sponsor Our Furry Friends </h1>  
    <div className="sponsor-banner" style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
      <img src="./data/img/adopt/cat-banner.jpg" alt="Sponsor Our Cats" className="img-fluid" />
      <button onClick={goToSponsorPage} className="sponsor-btn">
        Sponsor a Cat
      </button>
    </div>
    </>
 
  );
};

export default SponsorBanner;

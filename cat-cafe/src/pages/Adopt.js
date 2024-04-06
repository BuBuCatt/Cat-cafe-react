// src/pages/Adopt.js
import React from 'react';
import Cats from '../components/Cats';
import "../styles/adopt.css";



// cat carousal

const Carousel = ()=>{

  return(

    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./data/img/adopt/adopt-slide1.jpg" className="d-block w-100" alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img src="./data/img/adopt/adopt-slide2.jpg" className="d-block w-100" alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img src="./data/img/adopt/adopt-slide3.jpg" className="d-block w-100" alt="Second slide"/>
          </div>

          <div className="carousel-caption d-none d-md-block">
            <h1 className="text-center">Adopt a Cat</h1>
            <p className="text-center">Find your purrfect companion!</p>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
    </div>

  )
  
}



const Adopt = (props) => {
  return (

    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="hero-section">

              <Carousel/>
        

            </div>
          </div>
        </div>
      </div>

         

          {props.cats ? <Cats cats={props.cats}/> : <p>Loading cats data...</p>}

         
    </>
   
  );
}

export default Adopt;

// src/pages/Menu.js
import React from 'react';
import Menu from '../components/Menu';

const Cafe = (props) => {


  const Carousel = ()=>{

    return(
  
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="./data/img/menu/menu-03.png" className="d-block w-100" alt="First slide"/>
            </div>
            <div className="carousel-item">
              <img src="./data/img/menu/menu-02.png" className="d-block w-100" alt="Second slide"/>
            </div>
            <div className="carousel-item">
              <img src="./data/img/menu/menu-01.png" className="d-block w-100" alt="Second slide"/>
            </div>
  
            <div className="carousel-caption d-none d-md-block">
              <h1 className="text-center">Cafe Menu</h1>
              <p className="text-center">Enjoy our special blend of coffee and treats, perfect for cat lovers and coffee aficionados alike </p>
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

  // const addProObj = (props.addProObj !== null && props.addProObj) || (() => console.warn('addProObj is not defined'));
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

        <Menu menu={props.menu} addProObj={props.addProObj} cart={props.shoppingCart} type='order'/>

 
    </>
   
  );
}

export default Cafe;

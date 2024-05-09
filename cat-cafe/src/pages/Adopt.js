// src/pages/Adopt.js
import {React, useState, useEffect} from 'react';
import Cats from '../components/Cats';
import "../styles/adopt.css";
import Footer from '../components/Footer';
import DataService from '../services/DataService';
import { Alert } from 'react-bootstrap';




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
  const [msg,setMsg] = useState(null);
  const [data, setData] = useState(props.cats);
  const [alertType,setAlertType] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const reloadData = () => {
    // get cats data from database
    DataService.getData("getCats").then(
        (response)=>{
          setData(response.data);
        },
        (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while loading cats data.");
            setAlertType('danger');
        }
    )
  }


  useEffect(()=>{
    setWishlist(props.wishlist);
    reloadData();
  

    
    
    if(msg){
      setTimeout(()=> setMsg(null),5000)
    }
  },[msg,  props.wishlist]);












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

         
        {
            msg ? (
              <Alert variant={alertType} className='alert-msg bottom'>{msg}</Alert>
            ) : null
        }
          {data ? <Cats cats={data} addToWishlist={props.addToWishlist} removeFromWishlist={props.removeFromWishlist}/>  : <p>Loading cats data...</p>}

         <Footer/>
    </>
   
  );
}

export default Adopt;

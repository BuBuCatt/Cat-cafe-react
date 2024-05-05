// src/pages/Menu.js
import {React, useState, useEffect} from 'react';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import DataService from '../services/DataService';
import { Alert } from 'react-bootstrap';


const Cafe = (props) => {

  const [msg,setMsg] = useState(null);
  const [data, setData] = useState(props.menu);
  const [alertType,setAlertType] = useState("");

  const reloadData = () => {
    DataService.getData("getProducts").then(
        (response)=>{
          setData(response.data);
        },
        (rej)=>{
            let msg = rej.response && rej.response.data ? rej.response.data : rej.response;
            setMsg(msg || "An error occurred while reloading the data.");
            setAlertType('danger');
        }
    )
  }

  useEffect(()=>{
    reloadData();

    if(msg){
      // setTimeout(()=> setMsg(null),5000)
    }
  },[msg])

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
        {
            msg ? (
              <Alert variant={alertType} className='alert-msg'>{msg}</Alert>
            ) : null
        }

        { data ? 
          <Menu menu={data} addProObj={props.addProObj} cart={props.shoppingCart} type='order'/>
           : <p>Loading menu data....</p>
        }
        <Footer/>
 
    </>
   
  );
}

export default Cafe;

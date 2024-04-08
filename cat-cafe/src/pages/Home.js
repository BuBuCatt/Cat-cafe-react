import React from "react";
import HeroSection from "../components/HeroSection";
import  '../styles/home.css'
import Footer from "../components/Footer";
import CatList from "../components/CatList";
import SponsorBanner from "../components/SponsorBanner";




const Home = (props) => {


  return (
    <>



      <HeroSection/>
   

      {props.cats ? <CatList cats={props.cats}/> : <p>Loading cats data...</p>}

      <SponsorBanner/>

      <Footer/>
     
     
      
    </>
  );
}

export default Home;

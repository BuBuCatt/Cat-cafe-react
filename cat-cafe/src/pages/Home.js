import React from "react";
import HeroSection from "../components/HeroSection";
import  '../styles/home.css'
import Footer from "../components/Footer";
import CatList from "../components/CatList";
import SponsorBanner from "../components/SponsorBanner";




const Home = (props) => {


  //console.log("here is home"+ props.loginUser)

  return (
    <>

      { props.loginUser ? (
       
        <span>Welcome,{props.loginUser && props.loginUser.username}</span>

      ):(
        <span>Welcome, Guest!</span>

      )}

      <HeroSection/>
   

      {props.cats ? <CatList cats={props.cats}/> : <p>Loading cats data...</p>}

      <SponsorBanner/>

      {/* <Footer/> */}
     
     
      
    </>
  );
}

export default Home;

import React from "react";
import HeroSection from "../components/HeroSection";
import  '../styles/home.css'




const Home = (props) => {


  console.log("here is home"+ props.loginU)

  return (
    <>

      { props.loginU ? (
       
        <span>Welcome,{props.loginU && props.loginU.username}</span>

      ):(
        <span>Welcome, Guest!</span>

      )}

      <HeroSection/>
     
      
    </>
  );
}

export default Home;

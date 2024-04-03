import React from "react";
import HeroSection from "../components/HeroSection";
import  '../styles/home.css'




const Home = (props) => {


  console.log("here is home"+ props.loginUser)

  return (
    <>

      { props.loginUser ? (
       
        <span>Welcome,{props.loginUser && props.loginUser.username}</span>

      ):(
        <span>Welcome, Guest!</span>

      )}

      <HeroSection/>
     
      
    </>
  );
}

export default Home;

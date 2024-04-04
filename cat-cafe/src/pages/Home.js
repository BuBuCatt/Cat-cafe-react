import React from "react";
import HeroSection from "../components/HeroSection";
import  '../styles/home.css'
import NavImg from "../components/NavImg";




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
      {/* <NavImg/> */}
     
      
    </>
  );
}

export default Home;

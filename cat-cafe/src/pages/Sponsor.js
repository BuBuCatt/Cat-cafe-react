import React from 'react';
import SponsorCat from '../components/SponsorCat';
import Footer from "../components/Footer";

const Sponsor = (props) => {
  return (

    <>
      <SponsorCat addProductObj={props.addProObj} addSponsorObj={props.addSponsor}/>
      <Footer/>
    </>
  
  );
}

export default Sponsor;

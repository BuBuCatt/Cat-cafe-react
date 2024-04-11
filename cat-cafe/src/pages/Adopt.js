// src/pages/Adopt.js
import React from "react";
import Cats from "../components/Cats";
import "../styles/adopt.css";
import { useState } from "react";

// cat carousal

const Carousel = (props) => {
  const [adoptSubmmit, setadoptSubmmit] = useState({
    email: "",
    breed: "",
    color: "",
    age: "",
  });
  const changeHandler = (e) => {
    setadoptSubmmit((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(adoptSubmmit);
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   props.setadoptPerfectCat(adoptSubmmit);
  // };

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="./data/img/adopt/adopt-slide1.jpg"
            className="d-block w-100"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="./data/img/adopt/adopt-slide2.jpg"
            className="d-block w-100"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="./data/img/adopt/adopt-slide3.jpg"
            className="d-block w-100"
            alt="Second slide"
          />
        </div>

        <div className="carousel-caption d-none d-md-block">
          <h1 className="text-center">Adopt a Cat</h1>
          <p className="text-center">Find your purrfect companion!</p>

          {/* input for the perfect cat */}
          <form id="cat_request_form">
            <div className="mb-3">
              <input
                type="text"
                name="email"
                className="form-control"
                id="InputEmail1"
                value={adoptSubmmit.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="breed"
                className="form-control"
                id="InputBreed"
                value={adoptSubmmit.breed}
                onChange={changeHandler}
                placeholder="What Breed ?"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="color"
                className="form-control"
                id="InputColor"
                value={adoptSubmmit.color}
                onChange={changeHandler}
                placeholder="Color of the cat"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="age"
                className="form-control"
                id="InputAge"
                value={adoptSubmmit.age}
                onChange={changeHandler}
                placeholder="Age of the cat"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up for our newsletter
            </button>
          </form>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const Adopt = (props) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="hero-section">
              <Carousel />
            </div>
          </div>
        </div>
      </div>

      {props.cats ? (
        <Cats
          cats={props.cats}
          addToWishlist={props.addToWishlist}
          removeFromWishlist={props.removeFromWishlist}
        />
      ) : (
        <p>Loading cats data...</p>
      )}
    </>
  );
};

export default Adopt;

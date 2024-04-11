import React, { useState } from "react";

function CatRequestForm() {
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the inputs
    if (!breed || !age || !color) {
      setError("All fields are required");
      return;
    }

    console.log(`Breed: ${breed}, Age: ${age}, Color: ${color}`);
    // Here you can handle the form submission, e.g., send a request to your server

    // Clear the form
    setBreed("");
    setAge("");
    setColor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </label>
      {error && <p>{error}</p>}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default CatRequestForm;

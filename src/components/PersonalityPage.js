import React, { useState, useEffect } from "react";
import "./css/PersonalityPage.css";
import { HandleClick } from './modules/DateComputation.js';
import { UserAuth } from "../context/UserAuthContext";
import GoogleAPI from "./GoogleAPI.js";

function Quiz() {
  const { user } = UserAuth();
  const [places, setPlaces] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
      HandleClick({ email: user.email })
        .then((value) => {
          setTypes(value);
          console.log(value);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [user.email]);

  const frontendplaces = (val) => {
    setPlaces(val);
  };

  return (
    <div>
      <h1>TEST FOR THE API BACKEND</h1>
      {types.length > 0 && (
        <GoogleAPI data={types} sendplaces={frontendplaces} />
      )}
      <div>
        {places.map((place) => (
          <div key={place.id}>{place.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;

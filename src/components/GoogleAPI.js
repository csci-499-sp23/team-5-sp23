import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/GoogleAPI.css"

function GoogleAPI({ onAPIResults }) {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [types, setTypes] = useState([])
  const [typeIndex, setTypeIndex] = useState(-1);

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  function handlePrompt (types) {
    setTypes(types);
    setTypeIndex((typeIndex + 1) % 3);
  }


  useEffect(() => { //MAKE A BUTTON WHICH CHANGES THE TYPE INDEX TO REFRESH, USE THE ARRAY POSITION 0 FOR DATE, add a condition where there are no items and indicate to write again
    if (latitude && longitude) {
      const type = types[typeIndex];
  
      const promise = axios
        .get(
          `https://us-central1-csci499.cloudfunctions.net/firebaseGoogleAPI?location=${latitude},${longitude}&radius=5000&type=${type}`
        )
        .then((response) => response.data)
        .catch((error) => console.error(error));
  
      promise.then((results) => {
        const allPlaces = results.flat();
        setPlaces(allPlaces);
        onAPIResults(allPlaces);
      });
    }
  }, [latitude, longitude, typeIndex]);
  

  return (<GoogleAPI onAPIResults={onAPIResults} />);
}

export default GoogleAPI;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/GoogleAPI.css";

function GoogleAPI({ onAPIResults }) {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [types, setTypes] = useState([]);
  const [typeIndex, setTypeIndex] = useState(-1);

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  function handlePrompt(types) {
    setTypes(types);
    setTypeIndex((typeIndex + 1) % 3);
  }

  useEffect(() => {
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
        onAPIResults(allPlaces); // Pass the results to the parent component
      });
    }
  }, [latitude, longitude, typeIndex, onAPIResults]);

  return null;
}

export default GoogleAPI;
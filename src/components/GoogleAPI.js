import React, { useState, useEffect } from "react";
import axios from 'axios';

function GoogleAPI() {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const category = {
    romantic: ["restaurant", "cafe", "park", "museum"],
    adventurous: ["zoo", "aquarium", "amusement_park"],
    cultural: ["art_gallery", "library", "theatre"],
    outdoor: ["beach", "hiking", "campground"],
  };

  // Call geolocation API every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch places when latitude and longitude change
  useEffect(() => {
    if (latitude && longitude) {
      const promises = [];

      for (const key in category) {
        const types = category[key].join("|");
        const promise = axios
          .get(
              // `http://localhost:5001/csci499/us-central1/firebaseGoogleAPI?location=${latitude},${longitude}&radius=5000&type=${types}`
              `https://us-central1-csci499.cloudfunctions.net/firebaseGoogleAPI?location=${latitude},${longitude}&radius=5000&type=${types}`
          )
          .then((response) => response.data)
          .catch((error) => console.error(error));
        promises.push(promise);
      }

      Promise.all(promises).then((results) => {
        const allPlaces = results.flat();
        setPlaces(allPlaces);
      });
    }
  }, [latitude, longitude]);
  
    return (
      <div>
      <h1>Date ideas near you:</h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            {place.name} ({place.types[0]})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleAPI;
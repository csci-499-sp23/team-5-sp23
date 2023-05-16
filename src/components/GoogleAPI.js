import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/GoogleAPI.css";

function GoogleAPI( {data, sendplaces} ) {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [types, setTypes] = useState([]);

  navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
  });
  
  const handleClick = () => {
    setTypes(data);
  };
  
  useEffect(() => {
    sendplaces(places);
  }, [places]);

  useEffect(() => {
    if (latitude && longitude && (types.length !== 0)) {
      const fetchData = async () => {
  
        for (let i = 0; i < types.length; i++) {
          const type = types[i];
  
          const response = await axios.get(
            `https://us-central1-csci499.cloudfunctions.net/firebaseGoogleAPI?location=${latitude},${longitude}&radius=100&type=${type.date}`
          );
  
          const results = response.data;
          const flattenedResults = results.flat();
  
          if (flattenedResults.length > 0) {
            setPlaces(flattenedResults);
            console.log(flattenedResults);
            return; 
          }
        }
      };
  
      fetchData().catch((error) => console.error(error));
    }
  }, [latitude, longitude, types]);
  
return (
  <div>
    <button onClick={handleClick}>Send Places!!!!</button>
  </div>
);
}

export default GoogleAPI;
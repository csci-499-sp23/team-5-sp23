import React, { useState, useEffect } from "react";
import axios from "axios";
import Places from "./ChatParts/PlacesComponent";

const GoogleAPI = ({ data }) => {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [types, setTypes] = useState([]);
  const [DataExists, setData] = useState(false);
  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });
  useEffect(()=>{
    console.log("No data");
    console.log(DataExists);
  },[DataExists]);
  useEffect(()=>{
    setTypes(data)
  }, [data]);
  useEffect(()=>{
    if(places.length !== 0){
    setData(true);
    }
  }, [places]);

  useEffect(() => {
    console.log("First" + latitude + ' ' +  longitude);
    console.log(types.length === 0)
    if (latitude && longitude && types.length !== 0) {
        console.log(latitude + ' ' +  longitude);
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

  function getRandomInt(max) {
        
    return Math.floor(Math.random() * max);

  };
  return (
    <>
    {DataExists ? (
    <>
      
    <Places data={places[getRandomInt(places.length)]} />
      
    </>
     ) : (
      <h1>Loading locations</h1>
    )}
    </>
  );
};

export default GoogleAPI;
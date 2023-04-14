import React, { useState, useEffect } from "react";

function GoogleAPI() {
  const [places, setPlaces] = useState([]);
  const category = {
    romantic: ["restaurant", "cafe", "park", "museum"],
    adventurous: ["zoo", "aquarium", "amusement_park"],
    cultural: ["art_gallery", "library", "theatre"],
    outdoor: ["beach", "hiking", "campground"],
  };

  useEffect(() => {
    const API_KEY = "INSERT API KEY";
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const promises = [];

      for (const key in category) {
        const types = category[key].join("|");
        const promise = fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${types}&key=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => data.results)
          .catch((error) => console.error(error));
        promises.push(promise);

        console.log("useEffect called"); //comments to make sure this runs properly
      }

      Promise.all(promises).then((results) => {
        const allPlaces = results.flat();
        setPlaces(allPlaces);
        console.log("Retrieved places:", allPlaces); //comments to make sure this runs properly
      });
    });
  }, [category]);

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

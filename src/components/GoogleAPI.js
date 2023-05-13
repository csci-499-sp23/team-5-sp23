import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/GoogleAPI.css"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./css/GoogleAPI.css"

function GoogleAPI() {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [types, setTypes] = useState(["restaurant", "cafe", "park"])
  const [typeIndex, setTypeIndex] = useState(0);
  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  useEffect(() => {
    if (latitude && longitude) {
      const type = types[typeIndex];

      const promise = axios
        .get(
          `https://us-central1-csci499.cloudfunctions.net/firebaseGoogleAPI?location=${latitude},${longitude}&radius=5000&type=${type}`
        )
        .then((response) => response.data)
        .catch((error) => console.error(error));
      }

      Promise.all(promises).then((results) => {
        const allPlaces = results.flat();
        setPlaces(allPlaces);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="boxAPI">

      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>

      <h1>Date ideas near you:</h1>

      <div className="anotherBoxAPI">
        {/* Please do not erase, a visual was needed: */}
        {/* <ul>
          <li>
            Destination (Destination Type)
          </li>
          <li>
            Destinationnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnn  nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn (Destination Type)
          </li>
          <li>
            Destination (Destination Type)
          </li>
        </ul> */}

        <ul>
          {places.map((place) => (
            <li key={place.id}>
              {place.name} ({place.types[0]})
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default GoogleAPI;

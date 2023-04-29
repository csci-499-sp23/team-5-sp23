import React from "react";
import "./css/Home-Page.css";
// import bg from "./img/background.png";
import { useNavigate } from "react-router-dom";
// import { GooglePlacesApp } from "./GooglePlacesAPI";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="outercontainer"
      style={{
        // backgroundImage: `url(${bg})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      <div className="row">
        <div className="row">
          <button className="invisibleButton" onClick={() => navigate("/")}>
            <h2 className="selectedButton">Home</h2>
          </button>
          <button
            className="invisibleButton"
            onClick={() => navigate("/Terms-Conditions-Page")}
          >
            <h2 className="notSelectedButton">TOS</h2>
          </button>
          <button
            className="invisibleButton"
            onClick={() => navigate("/Contact-Page")}
          >
            <h2 className="notSelectedButton">Contact Us</h2>
          </button>
          <div className="buttonContainertemp">
            <button onClick={() => navigate("/Login-Page")}>
              <p>Log in</p>
            </button>
          </div>
        </div>
      </div>
        </div>
  );
};

export default Home;

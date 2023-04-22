import React from "react";
import "./css/Home-Page.css";
// import bg from "./img/background.png";
import titlelogo from "./img/titlelogo.png";
import Pic1 from "./img/landingPic1.png";
import Baby from "./img/landingBaby.png";
import Parents from "./img/landingParents.png";
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
        <div className="container">
          <img src={titlelogo} className="logoimage" alt="GeneAI" />
        </div>
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
      <div className="middlerow">
        <div className="container">
          <h2 className="orbTitle">A ONE-OF-A-KIND DATING EXPERIENCE.</h2>
          <h3>
            GeneAI is the only dating app that incorporates image generation
            technology. Utilize novel image processing techniques to find your
            matches today!
          </h3>
          <div className="buttonContainertemp">
            <button onClick={() => navigate("/Login-Page")}>
              <p>Create an Account</p>
            </button>
          </div>
        </div>
        <div className="imageportioncontainer">
          <img src={Pic1} className="topimage" alt="Dating for the Future" />
        </div>
      </div>
      <div className="bottomrow">
        <div className="row2">
          <div className="container">
            <img src={Baby} className="bottomimage" alt="Baby" />
          </div>
          <div className="container">
            <img src={Parents} className="bottomimage" alt="Parents" />
          </div>
        </div>
        <div className="container">
          <h2 className="orbTitle">Obtain AI-Generated Renditions</h2>
          <h3>
            Each match allows users to obtain high quality, one-of-a-kind imgs
            of your children.
          </h3>
          <div className="buttonContainertemp">
            <button onClick={() => navigate("/Login-Page")}>
              <p>Get It Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

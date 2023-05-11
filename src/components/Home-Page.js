import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "./img/logo.png";
import "./css/Home-Page.css";

const title = String("Persona");

const ButtonGroup = ({ children }) => (
  <div style={{ display: "flex" }}>{children}</div>
);

const Home = () => {
  return (
    <div className = "homepageContent">
      <div className = "logo-container">
        <Link to = "/">
          <img src={logo} alt="persona logo" className="logo" />
        </Link>
      </div>

      <div id = "homeBody"/>
      
      <h1>{title}</h1>
      <ButtonGroup>
        <Link to="/Signup-Page">
          <Button className="buttonHome" style={{ 
            marginRight: '23px', 
            backgroundColor: "#AB8D84",
            color: '#efefef',
            fontVariantCaps: 'all-petite-caps',
            border: '20px solid #AB8D84',
            fontSize: '17px',
            fontWeight: '600',
            fontFamily: 'Verdana' }}>Signup</Button>
        </Link>

        <Link to="/Login-Page">
        <Button className="buttonHome" style={{ 
            backgroundColor: "#AB8D84",
            color: '#efefef',
            border: '20px solid #AB8D84',
            fontSize: '17px',
            fontWeight: '600',
            fontVariantCaps: 'all-petite-caps',
            fontFamily: 'Verdana' }}>Login</Button>
        </Link>
      </ButtonGroup>

      <footer>
      <Link to="/Contact">
        Contact
      </Link>
      <Link to="/Terms-Conditions-Page">
        Terms and Conditions
      </Link>
    </footer>

    </div>
  );
};

export default Home;

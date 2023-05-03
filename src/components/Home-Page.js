import React from "react";
import "./css/Home-Page.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "./img/logo.png";

const title = String("Persona");

const ButtonGroup = ({ children }) => (
  <div style={{ display: 'flex' }}>
    {children}
  </div>
);

const Home = () => {
  return (
    <div className="homepageContent">
      <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      </div>

      <div id = "homeBody"/>
      
      <h1>{title}</h1>
      <ButtonGroup>
        <Link to="/Login-Page">
          <Button className="buttonHome" style={{ 
            marginRight: '18px', 
            backgroundColor: "#AB8D84",
            color: '#312E29',
            fontVariantCaps: 'all-petite-caps',
            border: '5px solid #AB8D84',
            fontSize: '15px',
            fontWeight: '600',
            fontFamily: 'Verdana' }}>Join Now</Button>
        </Link>

        <Link to="/Signup-Page">
        <Button className="buttonHome" style={{ 
            backgroundColor: "#AB8D84",
            color: '#312E29',
            border: '5px solid #AB8D84',
            fontSize: '15px',
            fontWeight: '600',
            fontVariantCaps: 'all-petite-caps',
            fontFamily: 'Verdana' }}>Login</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default Home;

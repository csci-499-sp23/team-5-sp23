import React from "react";
import "./css/Home-Page.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { textTransform } from "@mui/system";

const title = String("<insert dating app name here/>");

const ButtonGroup = ({ children }) => (
  <div style={{ display: 'flex' }}>
    {children}
  </div>
);

const Home = () => {
  return (
    
    <div className="homepageContent">
      <div id = "homeBody"/>
      <h1>{title}</h1>
      <ButtonGroup>
        <Link to="/Login-Page">
          <Button className="buttonHome" style={{ 
            marginRight: '13px', 
            backgroundColor: "#efefef",
            color: 'black',
            textTransform: 'uppercase',
            border: '5px solid white',
            fontSize: '15px',
            fontFamily: 'Verdana' }}>Join Now</Button>
        </Link>

        <Link to="/Signup-Page">
        <Button className="buttonHome" style={{ 
            backgroundColor: "#efefef",
            color: 'black',
            textTransform: 'uppercase',
            border: '5px solid white',
            fontSize: '15px',
            fontFamily: 'Verdana' }}>Login</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default Home;

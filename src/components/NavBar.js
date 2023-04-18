// Components/NavBar.js
import { NavLink } from "react-router-dom";
import "./css/NavBar.css";


const NavBar = () => {
  

  return (
    <nav className="navbar_container">
      <div className="row">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Login-Page">Login</NavLink>
        </li>
        <li>
          <NavLink to="/Matching-Page">Find Love</NavLink>
        </li>
        <li>
          <NavLink to="/Chat-Screen">Chat</NavLink>
        </li>
        <li>
          <NavLink to="/Profile-Page">User Profile</NavLink>
        </li>
        <li>
          <NavLink to="/Signup-Page">Join Now</NavLink>
        </li>
        <li>
          <NavLink to="/Terms-Conditions-Page">Terms and Conditions</NavLink>
        </li>
        <li>
          <NavLink to="/Contact-Page">Contact Us!</NavLink>
        </li>
        
      </div>
    </nav>
  );
};

export default NavBar;

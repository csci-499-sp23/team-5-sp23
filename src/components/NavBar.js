import { NavLink } from "react-router-dom";
import "./css/NavBar.css";


const NavBar = () => {

 return (
 <nav className='container'>
  <div className='row'>
    <li>
      <NavLink to="/Contact">Contact</NavLink>
    </li>
    <li>
      <NavLink to="/Terms-Conditions-Page">Legal</NavLink>
    </li>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/Signup-Page">Signup</NavLink>
    </li>
    <li>
      <NavLink to="/Login-Page">Login</NavLink>
    </li>
    <li>
      <NavLink to="/Matching-Page">Matching</NavLink>
    </li>
    <li>
      <NavLink to="/Chat-Page">Chat</NavLink>
    </li>
    <li>
      <NavLink to="/Profile-Page-Creation">Create Profile</NavLink>
    </li>
    <li>
      <NavLink to="/Profile-Page">User Profile</NavLink>
    </li>
    <li>
      <NavLink to="/GoogleAPI">API Test</NavLink>
    </li>
    <li>
      <NavLink to="/PersonalityPage">MBTI/Personality Test</NavLink>
    </li>
  </div>
 </nav>
 );
};

export default NavBar;

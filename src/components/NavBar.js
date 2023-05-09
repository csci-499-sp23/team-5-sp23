import { NavLink } from "react-router-dom";
import "./css/NavBar.css";


const NavBar = () => {

 return (
 <nav className='container'>
  <div className='row'>
    <li>
      <NavLink to="/Terms-Conditions-Page">TOS</NavLink>
    </li>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/Signup-Page">Join Now</NavLink>
    </li>
    <li>
      <NavLink to="/Login-Page">Login</NavLink>
    </li>
    <li>
      <NavLink to="/Matching-Page">Find Love</NavLink>
    </li>
    <li>
      <NavLink to="/ChatJS">Chat</NavLink>
    </li>
    <li>
      <NavLink to="/Profile-Page-Creation">Create User Profile</NavLink>
    </li>
    <li>
      <NavLink to="/GoogleAPI">API Test</NavLink>
    </li>
    <li>
      <NavLink to="/Profile-Page">User Profile</NavLink>
    </li>
    <li>
      <NavLink to="/PersonalityPage">MBTI/Personality Test</NavLink>
    </li>
  </div>
 </nav>
 );
};

export default NavBar;

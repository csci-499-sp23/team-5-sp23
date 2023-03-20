// Components/NavBar.js
import { NavLink } from 'react-router-dom';

const NavBar = () => {
 return (
 <nav>
       <ul>
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
            <NavLink to="/Chat-Page">Chat</NavLink>
          </li>
          <li>
            <NavLink to="/Profile-Page">User Profile</NavLink>
          </li>
          <li>
            <NavLink to="/Signup-Page">Join Now</NavLink>
          </li>
          <li>
            <NavLink to="/Terms-Conditions-Page">Legal Stuff</NavLink>
          </li>
        </ul>
 </nav>
 );
};

export default NavBar;
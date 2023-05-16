import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/UserAuthContext";
import "./css/NavBar.css";

const NavBar = () => {
  const { user } = UserAuth();
  return (
    <nav className="container">
      <div className="row">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/Matching-Page">Matching</NavLink>
            </li>
            <li>
              <NavLink to="/Chat-Page">Chat</NavLink>
            </li>
            <li>
              <NavLink to="/Profile-Page">User Profile</NavLink>
            </li>
            <li>
              <NavLink to="/PersonalityPage">MBTI/Personality Test</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/Signup-Page">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/Login-Page">Login</NavLink>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

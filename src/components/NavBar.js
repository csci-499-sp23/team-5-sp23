import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/UserAuthContext";
import "./css/NavBar.css";

const NavBar = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { logoutAccount } = UserAuth();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logoutAccount();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if(!user) return null

  return (
    <nav className="container">
      <div className="row">
        {/* <li>
          <NavLink to="/">Home</NavLink>
        </li> */}
        {user ? (
          <>
            <li>
              <NavLink to="/Profile-Page">User Profile</NavLink>
            </li>
            <li>
              <NavLink to="/Matching-Page">Matching</NavLink>
            </li>
            <li>
              <NavLink to="/ChatJS">Chat</NavLink>
            </li>
            <li id = "LogOutBtn"onClick={handleLogout}>
              Log Out
            </li>
            {/* <li>
              <NavLink to="/PersonalityPage">MBTI/Personality Test</NavLink>
            </li> */}
          </>
        ) : (
          <>
            {/* <li>
              <NavLink to="/Signup-Page">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/Login-Page">Login</NavLink>
            </li> */}
          </>
        )}
      </div>
    </nav>
  );

};

export default NavBar;

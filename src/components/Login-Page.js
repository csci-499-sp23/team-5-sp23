import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { UserAuth } from "../context/UserAuthContext";
import logo from "./img/logo.png";
import "./css/Login-Page.css";
// import { user } from "firebase-functions/v1/auth";
// import NavBar from './NavBar';

function LoginPage() {
  const { user, signIn } = UserAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(username, password);
    } catch (err) {
      console.log(err);
    }
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
    navigate("/Matching-Page");
  };

  if (user) {
    return <Navigate to="/Matching-Page" />;
  }

  return (
    <>
      {/* <NavBar/> */}
      <div className="loginBody">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="persona logo" className="logo" />
          </Link>
        </div>

        <h1>Welcome Back!</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Username: <br />
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password: <br />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;

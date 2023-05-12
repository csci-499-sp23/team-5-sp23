import React, { useState } from "react";
//import { async } from '@firebase/util';
// Moving following to UserAuthContext.js
// import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from '../firebase-config';
import { UserAuth } from "../context/UserAuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../components/css/Global-Styles.css";
import "./css/Signup-Page.css";
import logo from "./img/logo.png";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { createUser, logoutAccount } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted:", { firstName, lastName, email, password });
    try {
      await createUser(email, password);
      navigate("/PersonalityPage");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logoutAccount();
      navigate("/await-Signout");
    } catch (err) {
      console.error(err);
    }
  };

  // Check which user is signed in:
  // console.log(auth?.currentUser?.email)

  return (
    <div className="signupBody">
      
      <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="persona logo" className="logo" />
          </Link>
      </div>

      <h1>
        Ready to Find Love?
        <br />
        Join Now!
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <br />
        <button type="submit">Submit</button>
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
}

export default Signup;

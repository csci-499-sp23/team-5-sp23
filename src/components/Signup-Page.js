import React, { useState } from 'react';
//import { async } from '@firebase/util';
import { UserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import "../components/css/Global-Styles.css";
// Moving following to UserAuthContext.js
// import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from '../firebase-config';


function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { createUser, logoutAccount } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted:', { firstName, lastName, email, password });
    try{
      await createUser(email, password);
      navigate(('/Profile-Page'))
    }catch(err){
      console.error(err);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try{
      await logoutAccount();
      navigate(('/await-Signout'))
      
    }catch(err){
      console.error(err);
    }
  };

  // Check which user is signed in:
  // console.log(auth?.currentUser?.email)


  return (
    <div>
      <h1>Sign up</h1>
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
        <button type="submit">Submit</button>
      </form>

      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}

export default Signup;

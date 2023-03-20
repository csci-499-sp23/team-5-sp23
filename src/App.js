import './App.css';

import Home from './components/Home-Page';
import Login from './components/Login-Page';
import Match from './components/Matching-Page';
import Chat from './components/Chat-Page';
import Profile from './components/Profile-Page';
import Signup from './components/Signup-Page';
import Legal from './components/Terms-Conditions-Page';
import NavBar from './components/NavBar';

import { Routes, Route, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        {/* <Route index element={<Home />} /> */}
        <Route path="/Login-Page" element={<Login />} />
        <Route path="Match" element={<Match />} />
        <Route path="Chat" element={<Chat />} />
        <Route path="Profile Page" element={<Profile />} />
        <Route path="Signup for GeneAI" element={<Signup />} />
        <Route path="Legal Stuff" element={<Legal />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

// Components/NavBar.js
// import { NavLink } from 'react-router-dom';

// function Layout() {
//  return (
//  <nav>
//     <div>
//        <ul>
//           <li>
//             <NavLink to="/">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Login-Page">Login</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Matching-Page">Find Love</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Chat-Page">Chat</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Profile-Page">User Profile</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Signup-Page">Join Now</NavLink>
//           </li>
//           <li>
//             <NavLink to="/Terms-Conditions-Page">Legal Stuff</NavLink>
//           </li>
//         </ul>
//     </div>
//  </nav>
//  );
// };

function NoMatch() {
  return (
    <div>
      <h2>Whoopsies. You are lost!</h2>
      <NavLink to="/">click here to return to the home page :)</NavLink>
    </div>
  );
}
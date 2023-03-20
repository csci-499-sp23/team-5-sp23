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
        <Route path="/Login-Page" element={<Login />} />
<<<<<<< HEAD
        <Route path="Match" element={<Match />} />
        <Route path="Chat" element={<Chat />} />
        <Route path="/Profile-Page" element={<Profile />} />
        <Route path="Signup for GeneAI" element={<Signup />} />
        <Route path="Legal Stuff" element={<Legal />} />
=======
        <Route path="/Matching-Page" element={<Match />} />
        <Route path="/Chat-Page" element={<Chat />} />
        <Route path="/Profile-Page" element={<Profile />} />
        <Route path="/Signup-Page" element={<Signup />} />
        <Route path="/Terms-Conditions-Page" element={<Legal />} />
>>>>>>> 8c625d708ed136ee20c922b40184b65e58590cef
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Whoopsies. You are lost!</h2>
      <NavLink to="/">click here to return to the home page :)</NavLink>
    </div>
  );
}
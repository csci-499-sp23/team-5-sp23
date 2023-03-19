import './App.css';

import Home from './components/Home-Page';
import Login from './components/Login-Page';
import Match from './components/Matching-Page';
import Chat from './components/Chat-Page';
import Profile from './components/Profile-Page';
import Signup from './components/Signup-Page';
import Legal from './components/Terms-Conditions-Page';

import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Match" element={<Match />} />
          <Route path="Chat" element={<Chat />} />
          <Route path="Profile Page" element={<Profile />} />
          <Route path="Signup for GeneAI" element={<Signup />} />
          <Route path="Legal Stuff" element={<Legal />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

var navStyle = { textDecoration: "none", color: "red" };

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link style={navStyle} to="/">Home</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Login-Page">Login</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Matching-Page">Find Love</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Chat-Page">Chat</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Profile-Page">User Profile</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Signup-Page">Join Now</Link>
          </li>
          <li>
            <Link style={navStyle} to="/Terms-Conditions-Page">Legal Stuff</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Whoopsies. You are lost!</h2>
      <Link to="/">click here to return to the home page :)</Link>
    </div>
  );
}
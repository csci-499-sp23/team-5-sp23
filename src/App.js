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
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
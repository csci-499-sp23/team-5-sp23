import Home from './components/Home-Page';
import Login from './components/Login-Page';
import Match from './components/Matching-Page';
import Chat from './components/Chat-Page';
import Profile from './components/Profile-Page';
import Signup from './components/Signup-Page';
import TOS from './components/Terms-Conditions-Page';
import NavBar from './components/NavBar';
import Contact from './components/Contact-Page';
import GoogleAPI from './components/GoogleAPI';
import AwaitSignout from './components/await-Signout'

import { Routes, Route, NavLink } from "react-router-dom";
import {AuthContextProvider} from './context/UserAuthContext'
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="App">
      
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Login-Page" element={<Login />} />
          <Route path="/Matching-Page" element={<ProtectedRoute><Match /></ProtectedRoute>} />
          <Route path="/Chat-Page" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/Profile-Page" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/Signup-Page" element={<Signup />} />
          <Route path="/Terms-Conditions-Page" element={<TOS />} />
          <Route path="/Contact-Page" element={<Contact />} />
          <Route path='/GoogleAPI' element={<ProtectedRoute><GoogleAPI/></ProtectedRoute>} />
          <Route path='/await-Signout' element={<AwaitSignout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthContextProvider>
      
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

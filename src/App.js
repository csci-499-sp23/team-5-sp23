import Home from "./components/Home-Page";
import Login from "./components/Login-Page";
import Match from "./components/Matching-Page";
// import Chat from "./components/Chat-Page";
import Profile from "./components/Profile-Page";
import ProfileMaker from "./components/Profile-Page-Creation";
import Signup from "./components/Signup-Page";
import TOS from "./components/Terms-Conditions-Page";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact-Page";
import Personality from "./components/PersonalityPage";
import GoogleAPI from "./components/GoogleAPI";

import ChatJS from "./components/Chat";

import PartnerProfile from "./components/Partner-Profile-Page";


import { Routes, Route, NavLink } from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatSection from "./components/ChatParts/ChatSection";

export default function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/Login-Page" element={<Login />} />
          <Route
            path="/Matching-Page"
            element={
              <ProtectedRoute>
                <Match />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ChatJS"
            element={
              <ProtectedRoute>
                <ChatJS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile-Page-Creation"
            element={
              <ProtectedRoute>
                <ProfileMaker />
              </ProtectedRoute>
            }
          />
          <Route path="/Signup-Page" element={<Signup />} />
          <Route path="/PersonalityPage" element={<Personality />} />
          <Route path="/Terms-Conditions-Page" element={<TOS />} />
          <Route path="/Contact-Page" element={<Contact />} />
          <Route
            path="/GoogleAPI"
            element={
              <ProtectedRoute>
                <GoogleAPI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile-Page"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatJS"
            element={
              <ProtectedRoute>
                <ChatJS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatSectionTester"
            element={ <ProtectedRoute><ChatSection/></ProtectedRoute> }
          />

          <Route path="/Partner-Profile" element={<PartnerProfile />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </AuthContextProvider>
    </div>
  );
}
}

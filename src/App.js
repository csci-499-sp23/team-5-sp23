import Home from "./components/Home-Page";
import Login from "./components/Login-Page";
import Match from "./components/Matching-Page";
import Profile from "./components/Profile-Page";
import ProfileMaker from "./components/Profile-Page-Creation";
import Signup from "./components/Signup-Page";
import TOS from "./components/Terms-Conditions-Page";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact-Page";
import Personality from "./components/PersonalityPage";
import PartnerProfile from "./components/Partner-Profile-Page";
import ChatJS from "./components/Chat";
import { Routes, Route, NavLink } from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <Routes>
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
            path="/Profile-Page"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/Partner-Profile" element={<PartnerProfile />} />
          <Route path="/" element={<Home />} />
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

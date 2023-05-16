import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = UserAuth();
  //console.log("This is user")
  //console.log(user)
  if (!isInitialized) {
    return null;
  }
  if (!user) {
    //console.log("Return to home")

    return <Navigate to="/" />;
  }
  //console.log(user);
  return children;
};

export default ProtectedRoute;

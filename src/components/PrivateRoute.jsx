import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuthValue();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;

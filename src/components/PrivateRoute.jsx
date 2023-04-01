import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuthValue();

  if (!currentUser?.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

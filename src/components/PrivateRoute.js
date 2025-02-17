import React from "react";
import { Route, Navigate } from "react-router-dom";

// Private Route to protect pages
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

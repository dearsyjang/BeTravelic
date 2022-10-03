import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{
  isAuthenticated: boolean;
  children: React.ReactNode;
}> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/"  replace/>
  }

  return <>{children}</>;
};

export default ProtectedRoute;

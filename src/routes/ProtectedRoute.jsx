import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { profile } from "@/service/authService";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await profile();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

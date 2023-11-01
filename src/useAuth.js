import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    return !!jwtToken;
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  // Redirect to login if user is not authenticated when this hook is used
  useEffect(() => {
    if (!isAuthenticated()) {
      redirectToLogin();
    }
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return {
    isAuthenticated,
    redirectToLogin,
  };
}

import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    // Replace this with your authentication logic
    // For example, check if the JWT token is present in localStorage or a cookie
    const jwtToken = localStorage.getItem("jwtToken");
    return !!jwtToken;
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return {
    isAuthenticated,
    redirectToLogin,
  };
}

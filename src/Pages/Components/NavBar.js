import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBarStyles.css";
import Logo from "./images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="container header">
      <Link to="/home">
        <img src={Logo} className="logo" alt="" width={150} />
      </Link>
      <div className="menu">
        <a href="/home" className="header-btn1 bouncy">
          <i className="fas fa-home"></i> Home
        </a>
        <a href="/nopage" className="header-btn1 bouncy">
          <i className="fas fa-home"></i> About
        </a>
        <a href="/nopage" className="header-btn1 bouncy">
          <i className="fas fa-home"></i> Attendance
        </a>
        <a href="/addStudents" className="header-btn1 bouncy">
          <i className="fas fa-home"></i> Add Students
        </a>
      </div>
      <div>
        {/* Use onClick to trigger the logout function */}
        <a href="/login" className="header-btn1 bouncy" onClick={handleLogout}>
          <i className="fas fa-home"></i> Logout
        </a>
      </div>
    </div>
  );
};

export default NavBar;

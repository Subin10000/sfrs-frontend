import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ListCompany from "./component/ListCompany";
import CompanyDetailPage from "./component/CompanyDetail";

const Company = () => {
  const [company, setCompany] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    setUserData(decodedToken);
    try {
      const response = await axios.get(`http://localhost:8005/company/${decodedToken.id}`);
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      {userData.role === "admin" ? (
        <ListCompany />
      ) : (
        <CompanyDetailPage userData={userData} />
      )}
    </div>
  );
};

export default Company;

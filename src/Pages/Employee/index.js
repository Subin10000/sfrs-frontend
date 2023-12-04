import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwt_decode(token);
    const companyId = decodedToken.id;
    try {
      const response = axios.get(`http://localhost:8005/employees/${companyId}`);
      const dataFromBackend =  response.data;
      setEmployees(dataFromBackend);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }, []);
  
  return (
    <div style={{ width: 1000, height: "80vh" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <h2 style={{ flex: 1 }}>Employee Data</h2>
        <Button variant="contained" color="primary" component={Link} to="/addEmployees">
          Add Employee
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Date of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee?.firstname}</TableCell>
                <TableCell>{employee?.lastname}</TableCell>
                <TableCell>{employee?.email}</TableCell>
                <TableCell>{employee?.location}</TableCell>
                <TableCell>{employee?.startDate}</TableCell>
                <TableCell>{employee?.dateOfBirth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employee;

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
import axios from "axios";
import jwtDecode from "jwt-decode";

const Teacher = () => {
  const [teacher, setTeacher] = useState([]);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8005/teacher");
      setTeacher(response.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return; 
    }
    setUserData(jwtDecode(token));
    fetchData();
  }, []);

  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h2 style={{ flex: 1 }}>Teacher Data</h2>
        {
          userData.role == "admin" ? 
          (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/addTeacher"
            >
          Add Teacher
        </Button>
          )
          : ("") 
        }
        
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Faculty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacher.map((teach) => (
              <TableRow key={teach.id}>
                <TableCell>{teach.user.name}</TableCell>
                <TableCell>{teach.user.email}</TableCell>
                <TableCell>{teach.class.id}</TableCell>
                <TableCell>{teach.faculty.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Teacher;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState(null);
  const [facultyId, setFacultyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/students?classId=${classId}&facultyId=${facultyId}&search=`);
        const dataFromBackend = await response.data;
        console.log(dataFromBackend)
        setStudents(dataFromBackend);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{width: 1000, height: "80vh"}}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h2 style={{ flex: 1 }}>Student Data</h2>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/addStudents"
        >
          Add Student
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student?.firstname}</TableCell>
                <TableCell>{student?.lastname}</TableCell>
                <TableCell>{student?.roll}</TableCell>
                <TableCell>{student?.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Student;

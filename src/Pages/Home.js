import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NavBar from "./Components/NavBar";
import { useNavigate } from "react-router-dom";
const backendURL = "http://127.0.0.1:5000";


const Home = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchFaculties, setSearchFaculties] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if token is set in localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      // If token is not set, navigate to the login page
      navigate("/login");
      return; // No need to fetch attendance data if not authenticated
    }
  
    fetchAttendanceData();
    const intervalId = setInterval(fetchAttendanceData, 5000);
  
    return () => clearInterval(intervalId);
  }, [searchDate, searchClass, searchFaculties]);

  const fetchAttendanceData = async () => {
    try {
      const url = `${backendURL}/api/attendance?date=${searchDate}`;
      const response = await fetch(url);
      const data = await response.json();
      const dataArray = JSON.parse(data);
      setAttendanceData(dataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }
  };

  const handleEditAttendance = (id) => {
    console.log(`Editing attendance for student with ID: ${id}`);
  };

  useEffect(() => {
    fetchAttendanceData();
    const intervalId = setInterval(fetchAttendanceData, 5000);

    return () => clearInterval(intervalId);
  }, [searchDate, searchClass, searchFaculties]);

  return (
    <div style={{ margin: "20px", height: "100vh" }}>
      <NavBar/>
      <h1>Attendance System</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* ... (existing code for search filters and buttons) */}
      </div>
      <div style={{ margin: "20px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer component={Paper} style={{ flex: 1 }}>
            <Table style={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Attendance Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{attendance.fname}</TableCell>
                    <TableCell>{attendance.enter_time}</TableCell>
                    <TableCell>
                      {attendance.is_present === 1 ? (
                        <CheckCircleIcon style={{ color: "green" }} />
                      ) : (
                        <CancelIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleEditAttendance(attendance.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [dateFilter, setDateFilter] = useState('today');
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const fetchData = async () => {
    try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        const companyResponse = await axios.get(`http://localhost:8005/company/${userId}`);
        const companyId = companyResponse.data.id;
        const response = await axios.get(`http://localhost:8005/attendance/${companyId}/${dateFilter}`);
        const dataFromBackend = response.data;
        console.log(dataFromBackend)
        setAttendance(dataFromBackend);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return; 
    }
    fetchData();
  }, [dateFilter]);


  const downloadExcelFile = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(attendance);

    XLSX.utils.book_append_sheet(workbook, worksheet, "AttendanceData");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "attendance_data.xlsx");
  };


  return (
    <div style={{ width: 1000, height: "80vh" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <h2 style={{ flex: 1 }}>Attendance Data</h2>
        <Select
          id="date-filter-select"
          value={dateFilter}
          onChange={handleFilterChange}
          displayEmpty
          style={{ marginRight: "20px" }}
        >
          <MenuItem value="" disabled>Select Date Filter</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="last7days">Last 7 Days</MenuItem>
          <MenuItem value="lastmonth">Last Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={downloadExcelFile}>
          Download Excel
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Entry Time</TableCell>
              <TableCell>Roll No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((atten) => (
              <TableRow key={atten?.employee?.id}>
                <TableCell>{atten?.employee?.firstName + " " + atten?.employee?.lastName}</TableCell>
                <TableCell>{atten?.employee?.email}</TableCell>
                <TableCell>{new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kathmandu' }).format(new Date(atten?.entryTime))}</TableCell>
                {/* <TableCell>{atten?.employee?.roll}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Attendance;

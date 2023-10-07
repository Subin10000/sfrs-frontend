import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material";
import DashboardCard from "../Components/DashboardCard";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import jwt_decode from "jwt-decode";


const DashboardComponent = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const userId = 5;

        const teacher = await axios.get(`http://localhost:8000/teacher/${userId}`);
        setTeacherData(teacher.data);

        const classId = teacher.data.class.id;
        const facultyId = teacher.data.faculty.id;

        const students = await axios.get(`http://localhost:8000/students?classId=${classId}&faculty=${facultyId}&search=`);
        setStudentData(students.data);

        const attendance = await axios.get(`http://localhost:8000/attendance/today`);
        setAttendanceData(attendance.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard info:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Container sx={{ marginTop: "20%", paddingLeft: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Teacher Name"
            description="Description"
            descriptionValue="Description Value"
            value={teacherData?.user.name ?? "Teacher Name"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Students"
            description="Description"
            descriptionValue="Description Value"
            value={studentData?.length ?? "17"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Students Attendance"
            description="Description"
            descriptionValue="Description Value"
            value={attendanceData?.length}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Attendance Overview
        </Typography>
        <Divider />
        <Box
          sx={{
            display: "flex",
            height: "400px", // Set your desired height
          }}
        >
          <Box
            sx={{
              width: "50%",
              margin: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5", // Set your desired background color
              height: "400px", // Set your desired height
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: attendanceData?.length, label: "Absent" },
                    { id: 1, value: studentData?.length-attendanceData?.length, label: "Present" },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 200,
                  cy: 200,
                },
              ]}
              width={600}
              height={400}
            />
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              margin: "10px",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5", // Set your desired background color
              height: "400px", // Set your desired height
            }}
          >
            <div>Hello world</div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardComponent;

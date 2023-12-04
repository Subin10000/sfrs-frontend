import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material";
import DashboardCard from "../Components/DashboardCard";
import { LineChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [employeesData, setEmployeesData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8005";

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      const company = await axios.get(`${BASE_URL}/company/${userId}`);
      setCompanyData(company.data);
      const companyId = company.data.id;

      const employees = await axios.get(`http://localhost:8005/employees/${companyId}`);

      setEmployeesData(employees.data);

      const attendance = await axios.get(`http://localhost:8005/attendance/${companyId}/today`);
      setAttendanceData(attendance.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard info:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");
    console.log("dashboard",token)
    if (!token) {
      navigate("/login");
      return;
    }
    if (isMounted) {
      fetchDashboardData();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ marginTop: "10%", paddingLeft: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Company Name"
            description="Description"
            descriptionValue="Description Value"
            value={companyData?.user.name ?? "Company Name"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Employees"
            description="Description"
            descriptionValue="Description Value"
            value={employeesData?.length ?? "17"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard
            title="Employees Attendance"
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
            width: "100%",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            height: "400px",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: attendanceData?.length, label: "Absent" },
                  { id: 1, value: employeesData?.length - attendanceData?.length, label: "Present" },
                ],
                innerRadius: 40,
                outerRadius: 150,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 200,
              },
            ]}
            width={600}
            height={400}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardComponent;

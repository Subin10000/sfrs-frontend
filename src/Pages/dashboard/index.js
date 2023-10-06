import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import DashboardCard from '../Components/DashboardCard';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/teacherInfo');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard info:', error);
      }
    };
  
    useEffect(() => {
      fetchDashboardData();
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Title 1"
                            description="Description"
                            descriptionValue="Description Value"
                            value="Value"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Title 2"
                            description="Description"
                            descriptionValue="Description Value"
                            value="Value"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Title 3"
                            description="Description"
                            descriptionValue="Description Value"
                            value="Value"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            title="Title 4"
                            description="Description"
                            descriptionValue="Description Value"
                            value="Value"
                        />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Divider />
                    <Typography variant="h5" gutterBottom>
                        Attendance Overview
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '400px', // Set your desired height
                        }}
                    >
                        <Box
                        sx={{
                            width: '50%',
                            margin: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5', // Set your desired background color
                            height: '400px', // Set your desired height
                        }}
                    >
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Series A' },
                                        { id: 1, value: 15, label: 'Series B' },
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
                            width: '50%',
                            display: 'flex',
                            margin: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5', // Set your desired background color
                            height: '400px', // Set your desired height
                        }}
                    >
                        <div>Hello world</div>
                    </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;

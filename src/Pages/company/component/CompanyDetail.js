import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Container } from '@mui/material';
import jwtDecode from 'jwt-decode';

const CompanyDetailPage = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Check if company data is already in state
        if (company) {
          setLoading(false); // Set loading to false if data is already available
          return;
        }

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Decode the token to get user information
        const decodedToken = jwtDecode(token);

        // Fetch company data based on the user ID
        const response = await fetch(`http://localhost:8005/company/${decodedToken.id}`);
        const data = await response.json();

        setCompany(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [company]);

  return (
    <Container style={{ padding: '20px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px', width: '100%' }} elevation={3}>
        <Typography variant="h5" component="h2" gutterBottom>
          Company Detail
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <List>
            <ListItem>
              <ListItemText
                primary={<strong>ID:</strong>}
                secondary={company?.id}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Name:</strong>}
                secondary={company?.name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Email:</strong>}
                secondary={company?.email}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Phone Number:</strong>}
                secondary={company?.phoneNumber}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Location:</strong>}
                secondary={company?.location}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<strong>Role:</strong>}
                secondary={company?.role}
              />
            </ListItem>
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default CompanyDetailPage;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    role: "", // Keep the role field
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
      role: formData.role,
    };

    try {
      const response = await axios.post(
        "http://localhost:8005/company/create",
        companyData
      );

      navigate("/company");
    } catch (error) {
      console.error("Error adding Company:", error);
    }
  };

  return (
    <Container style={{ marginTop: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" component="h2">
          Add Company
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{ minWidth: "120px" }}>
                <InputLabel htmlFor="role-select">Role</InputLabel>
                <Select
                  id="role-select"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="company">Company</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "2rem" }}
              >
                Add Company
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default AddCompany;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Grid,
  Paper,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddStudents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    classid: "",
    facultyid: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Complete, setIsStep1Complete] = useState(false);

  useEffect(() => {
    // Check if token is set in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If token is not set, navigate to the login page
      navigate("/login");
      return; // No need to fetch attendance data if not authenticated
    }
  }, []);

  // Monitor changes in form data and update isStep1Complete
  useEffect(() => {
    const { fname, lname, phone, email, classid, facultyid } = formData;
    const allFieldsFilled =
      fname && lname && phone && email && classid && facultyid;
    setIsStep1Complete(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      setSelectedFile(file);
    }
  };

  const handleStepChange = () => {
    // Check if all required fields in step 1 are filled
    if (isStep1Complete) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/register",
        formData
      );
      setSnackbarMessage("Email sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log(response.data); // Handle success

      // Clear the form data after successful AddStudents
      setFormData({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        classid: "",
        facultyid: "",
      });

      // Optionally, you can redirect to the login page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Error sending email.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(error); // Handle error
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5" align="center">
          Add Students
        </Typography>
        {currentStep === 1 ? (
          <form onSubmit={handleStepChange}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Class ID"
                  name="classid"
                  value={formData.classid}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Faculty ID"
                  name="facultyid"
                  value={formData.facultyid}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleStepChange}
                  style={{ marginTop: 20 }}
                  disabled={!isStep1Complete}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} align="center">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="file-upload"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload">
                <Button
                  fullWidth
                  variant="contained"
                  component="span"
                  color="primary"
                  size="small"
                  style={{
                    margin: "4rem 0 0.5rem 0",
                    width: "15rem",
                    padding: "1rem",
                  }}
                >
                  Upload Image
                </Button>
              </label>
              {selectedFile && (
                <Typography variant="subtitle1">{selectedFile.name}</Typography>
              )}
            </Grid>

            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "3rem" }}
              >
                Add Student
              </Button>
            </Grid>
          </form>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddStudents;

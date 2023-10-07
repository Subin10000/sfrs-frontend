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
    firstname: "",
    lastname: "",
    phone: "",
    mail: "",
    classid: "",
    faculty: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [imageId, setImageId] = useState(""); // Store the image_id
  const [imagePath, setImagePath] = useState(""); // Store the image file path

  useEffect(() => {
    // Check if token is set in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If the token is not set, navigate to the login page
      navigate("/login");
      return; // No need to fetch attendance data if not authenticated
    }
  }, []);

  // Monitor changes in form data and update isStep1Complete
  useEffect(() => {
    const { firstname, lastname, phone, mail, classid, faculty } = formData;
    const allFieldsFilled =
      firstname && lastname && phone && mail && classid && faculty;
    setIsStep1Complete(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      const fileName = formData.firstname
        ? `${formData.firstname}.png`
        : `default.png`; // Default name if firstname is empty
      uploadAndRenameImage(file, fileName);
    }
  };

  // Function to upload and rename the image
  const uploadAndRenameImage = async (file, fileName) => {
    const formDataForUpload = new FormData();
    formDataForUpload.append("file", file, fileName);

    try {
      const response = await axios.post(
        "http://localhost:8000/students/upload",
        formDataForUpload
      );
      setImageId(response.data.image_id);
      setImagePath(response.data.filePath); // Store the image file path
      setSnackbarMessage("Image uploaded successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error uploading image.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(error);
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
      // Add image_id to the form data before sending
      const formDataWithImageId = {
        ...formData,
        image_id: imageId,
        image: imagePath, // Include the image path
      };

      // Send the form data with the renamed image path
      const response = await axios.post(
        "http://localhost:8000/students/create",
        formDataWithImageId
      );
      setSnackbarMessage("Student added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log(response.data); // Handle success

      // Clear the form data after successful AddStudent
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        mail: "",
        classid: "",
        faculty: "",
      });
      setSelectedFile(null);
      setImageId("");
      setImagePath("");

      // Optionally, you can redirect to another page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate("/students");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Error adding student.");
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
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
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
                  label="mail"
                  name="mail"
                  type="mail"
                  value={formData.mail}
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
                  name="faculty"
                  value={formData.faculty}
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
          currentStep === 2 && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                    <Typography variant="subtitle1">
                      {selectedFile.name}
                    </Typography>
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
              </Grid>
            </form>
          )
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

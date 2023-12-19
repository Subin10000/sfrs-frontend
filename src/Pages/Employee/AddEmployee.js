import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Grid,
  Paper,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AddEmployees = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    companyID: ""
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [imageId, setImageId] = useState(""); // Store the image_id
  const [companyId, setCompanyId] = useState(""); // Store the image_id
  const [imagePath, setImagePath] = useState(""); // Store the image file path

  const [capturedImagesCount, setCapturedImagesCount] = useState(0);

  const videoRef = useRef(null);
  const captureIntervalRef = useRef(null);
  const capturedImagesRef = useRef([]);

  useEffect(() => {
    // Check if token is set in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If the token is not set, navigate to the login page
      navigate("/login");
      return; // No need to fetch attendance data if not authenticated
    }
    const decodedToken = jwt_decode(token);
    const currentCompanyId = decodedToken.id;
    setCompanyId(currentCompanyId)
  }, []);

  // Monitor changes in form data and update isStep1Complete
  useEffect(() => {
    const { firstName, lastName, location, email } = formData;
    const allFieldsFilled = firstName && lastName && location && email;
    setIsStep1Complete(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleCaptureImage = () => {
    try {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCurrentStep(2); // Move to the next step once the camera is accessed

          // Start capturing images at intervals
          captureIntervalRef.current = setInterval(captureImage, 100);
        }
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

      const dataUrl = canvas.toDataURL("image/png");
      capturedImagesRef.current.push(dataUrl);

      // Update the count of captured images
      setCapturedImagesCount((prevCount) => prevCount + 1);

      // For demonstration purposes, let's stop capturing after 30 images
      if (capturedImagesRef.current.length >= 30) {
        stopCapture();
      }
    }
  };

  const stopCapture = () => {
    clearInterval(captureIntervalRef.current);

    // Call your upload function with the captured images
    uploadImages();
  };

  const uploadImages = async () => {
    try {
      const imageUploadPromises = capturedImagesRef.current.map(
        async (dataUrl, index) => {
          const fileName = `${formData.firstName}_${index + 1}.png`;
          const blob = await fetch(dataUrl).then((res) => res.blob());

          const formDataForUpload = new FormData();
          formDataForUpload.append("file", blob, fileName);

          const response = await axios.post(
            "http://localhost:8005/employees/upload",
            formDataForUpload
          );

          return response.data; // You might want to store the image_id and filePath
        }
      );

      const uploadedImages = await Promise.all(imageUploadPromises);

      // Handle success
      setSnackbarMessage("Images captured and uploaded successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Clear the captured images
      capturedImagesRef.current = [];
    } catch (error) {
      setSnackbarMessage("Error uploading images.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        "http://localhost:8005/employees/create",
        formDataWithImageId
      );

      setSnackbarMessage("Employee added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // console.log(response.data);  Handle success

      // Clear the form data after successful AddEmployee
      setFormData({
        firstName: "",
        lastName: "",
        location: "",
        email: "",
      });

      setImageId("");
      setImagePath("");

      // Optionally, you can redirect to another page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate("/employees");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Error adding employee.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error(error); // Handle error
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography component="h1" variant="h5" align="center">
          Add Employees
        </Typography>
        {currentStep === 1 ? (
          <form onSubmit={handleStepChange}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="location"
                  name="location"
                  value={formData.location}
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
            <div>
              <video
                ref={videoRef}
                width="400"
                height="300"
                autoPlay
                style={{ display: "block", margin: "auto" }}
              ></video>
              <Typography variant="h6" align="center" style={{ marginTop: 10 }}>
                Pictures Captured: {capturedImagesCount}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={stopCapture}
                    style={{ marginTop: "3rem" }}
                  >
                    Stop Capturing
                  </Button>
                </Grid>
              </Grid>
            </div>
          )
        )}
        {currentStep === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCaptureImage}
                style={{ marginTop: "3rem" }}
              >
                Capture Images
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: "3rem" }}
              >
                Add Employee
              </Button>
            </Grid>
          </Grid>
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

export default AddEmployees;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
      return; // No need to fetch attendance data if not authenticated
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      const response = await axios.post(
        "http://localhost:8005/users/login",
        formData
      ); // Make an API request to your login endpoint
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      navigate("/"); // Navigate to the dashboard
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
            }
            label="Show password"
          />
           <Link to="/forgotPassword" style={{marginLeft:"7rem"}}>Forgot Password?</Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Login;

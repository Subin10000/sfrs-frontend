import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8005/users/request-password-reset",
        { email }
      ); 
      alert("Please check your email for password reset instructions.");
    } catch (error) {
      console.error("Forgot password request failed:", error);
      alert("An error occurred. Please try again.");
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Password Reset Email
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Container, Grid, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EmailTemplatePage = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return; 
    }
  }, []);


  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8005/api/email",emailData);
      const apiData = response.data;
      console.log(apiData)
      if(apiData.message = "success"){
        setOpenAlert(true);
        setEmailData({
          to: "",
          subject: "",
          text: "",
        })
      }
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem", textAlign: "center" }}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Email sent successfully!
        </Alert>
      </Snackbar>
      <Typography variant="h5" component="h2">
        Compose Email
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="To"
              name="to"
              value={emailData.to}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Text"
              name="text"
              value={emailData.text}
              onChange={handleInputChange}
              required
              fullWidth
              multiline
              rows={6}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EmailTemplatePage;

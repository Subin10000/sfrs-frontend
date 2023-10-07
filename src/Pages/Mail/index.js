import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const EmailTemplatePage = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = () => {
    // Implement sending the email using an email service or API here
    // You can use Axios or any other library to make the API call
    // Example:
    // axios.post('/api/send-email', emailData).then(response => {
    //   // Handle successful response, e.g., show a success message
    // }).catch(error => {
    //   // Handle error, e.g., show an error message to the user
    // });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem", textAlign: "center" }}>
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
              label="Body"
              name="body"
              value={emailData.body}
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

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const fetchCompanyData = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8005/company/${userId}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching company data: ${error.message}`);
  }
};

const fetchEmployeesData = async (companyId) => {
  try {
    const response = await axios.get(`http://localhost:8005/employees/${companyId}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching employee data: ${error.message}`);
  }
};

const EmailTemplatePage = () => {
  const [employees, setEmployees] = useState([]);
  const [emailData, setEmailData] = useState({
    to: [],
    subject: "",
    text: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const fetchDataAndSetEmployees = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = await jwt_decode(token);
    const userId = decodedToken.id;

    try {
      const userData = await fetchCompanyData(userId);
      const companyId = userData.data.id;

      const employeesData = await fetchEmployeesData(companyId);
      setEmployees(employeesData.data);
      console.log(employeesData.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndSetEmployees();
  }, []);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "to") {
      setEmailData({
        ...emailData,
        to: e.target.value, // Change this line to handle multiple selected values
      });
    } else {
      setEmailData({
        ...emailData,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleRemoveEmail = (removedEmail) => {
    setEmailData({
      ...emailData,
      to: emailData.to.filter((email) => email !== removedEmail),
    });
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8005/api/email", emailData);
      const apiData = response.data;
      console.log(apiData);
      if (apiData.message === "success") {
        setOpenAlert(true);
        setEmailData({
          to: [],
          subject: "",
          text: "",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
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
          <FormControl fullWidth>
          <InputLabel id="to-label">To</InputLabel>
          <Select
            labelId="to-label"
            id="to"
            name="to"
            multiple
            value={emailData.to}
            onChange={(e) => handleInputChange({ target: { name: "to", value: e.target.value } })}
            required
            fullWidth
            renderValue={(selected) => (
              <div>
                {selected.map((email) => (
                  <Chip
                    key={email}
                    label={email}
                    onDelete={() => handleRemoveEmail(email)}
                    color="primary"
                    style={{ margin: "2px" }}
                  />
                ))}
              </div>
            )}
          >
            {employees?.map((employee) => (
              <MenuItem key={employee.id} value={employee.email}>
                {employee.email}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
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
            <Button type="button" variant="contained" color="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EmailTemplatePage;

import React, { useState, useEffect } from "react";
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

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    selectedClass: "",
    selectedFaculty: "", // Initialize with an empty string
  });

  const [classList, setClassList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    // Fetch class and faculty data from API and setClassList/setFacultyList
    // Example:
    // axios.get('/api/classes').then(response => setClassList(response.data));
    // axios.get('/api/faculties').then(response => setFacultyList(response.data));
  }, []); // Empty dependency array ensures this effect runs once after initial render

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to API endpoint using Axios
    // Example:
    // axios.post('/api/teachers', formData).then(response => {
    //   // Handle successful response, e.g., redirect to another page or show a success message
    // }).catch(error => {
    //   // Handle error, e.g., show an error message to the user
    // });
  };

  return (
    <Container style={{ marginTop: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" component="h2">
          Add Teacher
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
                  <MenuItem value="teacher">Teacher</MenuItem>
                  {/* Add other roles as MenuItems */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{ minWidth: "120px" }}>
                <InputLabel htmlFor="class-select">Class</InputLabel>
                <Select
                  id="class-select"
                  name="selectedClass"
                  value={formData.selectedClass}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Select Class</MenuItem>
                  {classList.map((classItem) => (
                    <MenuItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth style={{ minWidth: "120px" }}>
                <InputLabel htmlFor="faculty-select">Faculty</InputLabel>
                <Select
                  id="faculty-select"
                  name="selectedFaculty"
                  value={formData.selectedFaculty}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Select Faculty</MenuItem>
                  {facultyList.map((facultyItem) => (
                    <MenuItem key={facultyItem.id} value={facultyItem.id}>
                      {facultyItem.name}
                    </MenuItem>
                  ))}
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
                Add Teacher
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddTeacher;

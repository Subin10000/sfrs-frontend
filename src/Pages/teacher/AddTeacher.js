import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    selectedClass: '',
    selectedFaculty: '',
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
    <div>
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleInputChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            {/* Add other roles as options */}
          </select>
        </div>
        <div>
          <label>Class:</label>
          <select name="selectedClass" value={formData.selectedClass} onChange={handleInputChange} required>
            <option value="">Select Class</option>
            {classList.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Faculty:</label>
          <select name="selectedFaculty" value={formData.selectedFaculty} onChange={handleInputChange} required>
            <option value="">Select Faculty</option>
            {facultyList.map((facultyItem) => (
              <option key={facultyItem.id} value={facultyItem.id}>
                {facultyItem.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTeacher;

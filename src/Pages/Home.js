import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavigation from "./NavigationBar";
const backendURL = "http://127.0.0.1:5000";


const Home = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchFaculties, setSearchFaculties] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if token is set in localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      // If token is not set, navigate to the login page
      navigate("/login");
      return; // No need to fetch attendance data if not authenticated
    }
  
    fetchAttendanceData();
    const intervalId = setInterval(fetchAttendanceData, 5000);
  
    return () => clearInterval(intervalId);
  }, [searchDate, searchClass, searchFaculties]);

  const fetchAttendanceData = async () => {
    try {
      const url = `${backendURL}/api/attendance?date=${searchDate}`;
      const response = await fetch(url);
      const data = await response.json();
      const dataArray = JSON.parse(data);
      setAttendanceData(dataArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }
  };

  const handleEditAttendance = (id) => {
    console.log(`Editing attendance for student with ID: ${id}`);
  };

  useEffect(() => {
    fetchAttendanceData();
    const intervalId = setInterval(fetchAttendanceData, 5000);

    return () => clearInterval(intervalId);
  }, [searchDate, searchClass, searchFaculties]);

  return (
    <div style={{ margin: "20px", height: "100vh" }}>
      {/* <NavBar/> */}
      <SideNavigation/>
    </div>
  );
};

export default Home;

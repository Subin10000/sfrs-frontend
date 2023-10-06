import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPage from "./Pages/NoPage";
import AddStudents from "./Pages/student/AddStudents";
import Student from "./Pages/student";
import Teacher from "./Pages/teacher";
import AddTeacher from "./Pages/teacher/conponent/AddTeacher";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/addStudents" element={<AddStudents />} />
          <Route path="/addStudents" element={<AddTeacher />} />
          <Route path="/students" element={<Student />} />
          <Route path="/teachers" element={<Teacher />} />
          {/* <Route path="/search/:id" element={<SearchResult />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

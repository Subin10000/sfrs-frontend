import "./App.css";
import Home from "./Pages/Home";
import AddStudents from "./Pages/AddStudents";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPage from "./Pages/NoPage";
import AddTeacher from "./Pages/AddTeacher";

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
          {/* <Route path="/search/:id" element={<SearchResult />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

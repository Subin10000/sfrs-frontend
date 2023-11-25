import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPage from "./Pages/NoPage";
import AddStudents from "./Pages/student/AddStudents";
import Student from "./Pages/student";
import Teacher from "./Pages/teacher";
import AddTeacher from "./Pages/teacher/component/AddTeacher";
import Layout from "./Layout/MainLayout";
import DashboardComponent from "./Pages/dashboard";
import EmailTemplatePage from "./Pages/Mail";
import Attencance from "./Pages/attendance";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/addStudents" element={<AddStudents />} />
          <Route path="/addTeacher" element={<AddTeacher />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/students" element={<Student />} />
          <Route path="/teachers" element={<Teacher />} />
          <Route path="/attendance" element={<Attencance />} />
          <Route path="/mail" element={<EmailTemplatePage />} />
          {/* <Route path="/search/:id" element={<SearchResult />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

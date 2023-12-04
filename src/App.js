import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoPage from "./Pages/NoPage";
import Student from "./Pages/Employee";
import Layout from "./Layout/MainLayout";
import DashboardComponent from "./Pages/dashboard";
import EmailTemplatePage from "./Pages/Mail";
import Attencance from "./Pages/attendance";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPasswords";
import AddCompany from "./Pages/company/component/AddCompany";
import Company from "./Pages/company";
import AddEmployees from "./Pages/Employee/AddEmployee";
import Employee from "./Pages/Employee";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/addEmployees" element={<AddEmployees />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/company" element={<Company/>} />
          <Route path="/attendance" element={<Attencance />} />
          <Route path="/mail" element={<EmailTemplatePage />} />
          {/* <Route path="/search/:id" element={<SearchResult />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

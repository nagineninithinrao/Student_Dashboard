import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import StudentTable from "./components/StudentTable/StudentTable";
import "./Styles/App.css";
import AddStudent from "./components/AddStudent/AddStudent";
import StudentForm from "./components/StudentForm/StudentForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<StudentTable />} />
      <Route path="/students/add" element={<AddStudent />} />
      <Route path="/students/edit/:id" element={<StudentForm />} />
    </Routes>
  );
}

export default App;

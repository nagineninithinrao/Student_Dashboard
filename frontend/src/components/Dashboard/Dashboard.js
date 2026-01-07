import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SummaryCard from "../SummaryCard/SummaryCard";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data.students || []))
      .catch(() => setStudents([]));
  }, [token]);

  const pendingFees = students.filter((s) => s.feesStatus === "Pending").length;

  return (
    <>
      <Header />

      <div className="dashboard">
        <h1>Student Dashboard</h1>

        <div className="summary-container">
          <SummaryCard title="Total Students" value={students.length} />
          <SummaryCard title="Pending Fees" value={pendingFees} />
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/students")}>View Students</button>
          <button onClick={() => navigate("/students/add")}>Add Student</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

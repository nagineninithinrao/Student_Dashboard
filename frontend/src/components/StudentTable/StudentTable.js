import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header"; // ✅ IMPORT HEADER
import "./StudentTable.css";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchStudents = () => {
    fetch("http://localhost:5000/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStudents(data.students || []))
      .catch(() => setStudents([]));
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchStudents();
  };

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchClass = selectedClass === "All" || s.class === selectedClass;

    return matchSearch && matchClass;
  });

  return (
    <>
      {/* ✅ COMMON HEADER */}
      <Header />

      {/* ✅ PAGE CONTENT */}
      <div className="student-table-container">
        <h2>Student List</h2>

        <div className="table-controls">
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="All">All Classes</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>

          <button onClick={() => navigate("/students/add")}>
            ➕ Add Student
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length ? (
                filteredStudents.map((s) => (
                  <tr key={s._id}>
                    <td>
                      {s.photo ? (
                        <img
                          src={`http://localhost:5000${s.photo}`}
                          className="student-photo"
                          alt="student"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.class}</td>
                    <td
                      className={
                        s.feesStatus === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }
                    >
                      {s.feesStatus}
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => navigate(`/students/edit/${s._id}`)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="danger"
                        onClick={() => handleDelete(s._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentTable;

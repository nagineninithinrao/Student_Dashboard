import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tituzent.avif";
import "./AddStudent.css";

function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    feesStatus: "Paid",
  });

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    if (photo) data.append("photo", photo);

    try {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add student");

      navigate("/students");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div id="hero">
      <div className="page-wrapper">
        <h1 id="school-Name">Tituzent School of Learning</h1>

        <div id="grid-container">
          <div id="grid-container1">
            <img src={logo} id="image" alt="Tituzent Logo" />
          </div>

          <div id="grid-container2">
            <div id="loginform">
              <h2>Add Student</h2>

              <form onSubmit={handleSubmit}>
                <label>Student Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <label>Class</label>
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>

                <label>Fees Status</label>
                <select
                  name="feesStatus"
                  value={form.feesStatus}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>

                <label>Student Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />

                {error && <p className="error">{error}</p>}

                <button type="submit" id="login">
                  Save Student
                </button>

                <button
                  type="button"
                  className="back-btn"
                  onClick={() => navigate("/students")}
                >
                  ← Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;

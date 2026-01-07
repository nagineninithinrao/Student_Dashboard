import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./StudentForm.css";

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    feesStatus: "Paid",
  });

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();

        setForm({
          name: data.name,
          email: data.email,
          class: data.class,
          feesStatus: data.feesStatus,
        });
      } catch (err) {
        setError("Failed to load student details");
      }
    };

    fetchStudent();
  }, [id, isEdit, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (photo) data.append("photo", photo);

    try {
      const url = isEdit
        ? `http://localhost:5000/api/students/${id}`
        : "http://localhost:5000/api/students";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Save failed");

      navigate("/students");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div id="hero">
        <div className="page-wrapper">
          <div id="grid-container">
            <div id="grid-container2">
              <div id="loginform">
                <h2>{isEdit ? "Edit Student" : "Add Student"}</h2>

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

                  <button type="submit" id="login" disabled={loading}>
                    {loading
                      ? "Saving..."
                      : isEdit
                      ? "Update Student"
                      : "Save Student"}
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
    </>
  );
}

export default StudentForm;

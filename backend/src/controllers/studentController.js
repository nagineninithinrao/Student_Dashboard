import Student from "../models/Student.js";

export const addStudent = async (req, res) => {
  try {
    const { name, email, class: studentClass, feesStatus } = req.body;

    if (!name || !email || !studentClass) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const student = await Student.create({
      name,
      email,
      class: studentClass,
      feesStatus,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(student);
  } catch (err) {
    console.error("Add Student Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

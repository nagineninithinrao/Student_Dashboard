import express from "express";
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("photo"), addStudent);
router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, getStudentById);
router.put("/:id", authMiddleware, upload.single("photo"), updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;

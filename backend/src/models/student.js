import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    class: { type: String, required: true },
    feesStatus: { type: String, default: "Paid" },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    dob: Date,
    gender: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

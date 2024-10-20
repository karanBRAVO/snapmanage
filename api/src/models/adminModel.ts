import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Admin username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Admin password is required"],
    },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model("admin", adminSchema);

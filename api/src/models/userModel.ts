import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, "User father name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "User phone number is required"],
      trim: true,
    },
    // email: {
    //   type: String,
    //   required: [true, "User email is required"],
    //   trim: true,
    // },
    // dob: {
    //   type: String,
    //   required: [true, "User dob is required"],
    //   trim: true,
    // },
    username: {
      type: String,
      required: [true, "User username is required"],
      unique: true,
      trim: true,
    },
    // password: {
    //   type: String,
    //   required: [true, "User password is required"],
    //   trim: true,
    // },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);

import { Response, Request } from "express";
import { AdminModel } from "../models/adminModel";
import { compareSync, hashSync } from "bcrypt";
import { UserModel } from "../models/userModel";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import { StatusModel } from "../models/statusModel";

interface IAdminData {
  username: string;
  password: string;
}

export interface JWTPayload {
  _id: string;
}

export const adminLoginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IAdminData;
    console.log({ username, password });
    if (!username) {
      return res.status(401).json({ message: "Username not provided." });
    }
    if (!password) {
      return res.status(401).json({ message: "Password not provided." });
    }

    const existingAdmin = await AdminModel.findOne({ username: username });
    if (existingAdmin === null) {
      return res
        .status(404)
        .json({ message: "Admin not found | Signup required." });
    }

    if (!compareSync(password, existingAdmin.password)) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("Invalid JWT secret");
    }

    const token = JWT.sign({ _id: existingAdmin._id }, jwtSecret);

    return res.status(200).json({
      message: "Login successful",
      data: { username, token },
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminSignupHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IAdminData;
    if (!username) {
      return res.status(401).json({ message: "Username not provided." });
    }
    if (!password) {
      return res.status(401).json({ message: "Password not provided." });
    }

    const existingAdmin = await AdminModel.find({});
    if (existingAdmin && existingAdmin.length > 0) {
      return res.status(404).json({ message: "Admin already exists" });
    }

    const newAdmin = new AdminModel({
      username,
      password: hashSync(password, 10),
    });
    await newAdmin.save();

    return res.status(200).json({ message: "Signup successful" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Invalid request" });
    }

    const { _id: adminId } = req.user;
    if (!adminId) {
      return res.status(404).json({ message: "Token not verified" });
    }

    const existingAdmin = await AdminModel.findOne({
      _id: new mongoose.Types.ObjectId(adminId),
    });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin do not exists" });
    }

    const users = await UserModel.find({}).select(
      "_id name fatherName phoneNumber email dob username"
    );

    return res.status(200).json({ message: "Users details sent", data: users });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Invalid request" });
    }

    const { _id: adminId } = req.user;
    if (!adminId) {
      return res.status(404).json({ message: "Token not verified" });
    }

    const existingAdmin = await AdminModel.findOne({
      _id: new mongoose.Types.ObjectId(adminId),
    });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin do not exists" });
    }

    const { userId } = req.query as { userId: string };
    if (!userId) {
      return res.status(401).json({ message: "User id not provided" });
    }

    const userDetails = await StatusModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!userDetails) {
      return res.status(401).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User stats sent", data: userDetails.stats });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

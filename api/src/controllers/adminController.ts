import { Response, Request } from "express";
import { AdminModel } from "../models/adminModel";
import { compareSync, hashSync } from "bcrypt";
import { UserModel } from "../models/userModel";

interface IAdminData {
  username: string;
  password: string;
}

export const adminLoginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IAdminData;
    if (!username) {
      res.json({ message: "Username not provided." }).status(401);
      return;
    }
    if (!password) {
      res.json({ message: "Password not provided." }).status(401);
      return;
    }

    const existingAdmin = await AdminModel.findOne({ username: username });
    if (existingAdmin === null) {
      res.json({ message: "Admin not found | Signup required." }).json(404);
      return;
    }

    if (!compareSync(password, existingAdmin.password)) {
      res.json({ message: "Incorrect password" }).json(401);
      return;
    }

    res.json({ message: "Login successful" }).status(200);
    return;
  } catch (err: any) {
    console.log(err);
    res.json({ message: "Internal Server Error" }).status(500);
    return;
  }
};

export const adminSignupHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IAdminData;
    if (!username) {
      res.json({ message: "Username not provided." }).status(401);
      return;
    }
    if (!password) {
      res.json({ message: "Password not provided." }).status(401);
      return;
    }

    const existingAdmin = await AdminModel.find({});
    if (existingAdmin && existingAdmin.length > 0) {
      res.json({ message: "Admin already exists" }).json(404);
      return;
    }

    const newAdmin = new AdminModel({
      username,
      password: hashSync(password, 100),
    });
    await newAdmin.save();

    res.json({ message: "Signup successful" }).status(200);
    return;
  } catch (err: any) {
    console.log(err);
    res.json({ message: "Internal Server Error" }).status(500);
    return;
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).select(
      "_id name fatherName phoneNumber email dob username"
    );

    res.json({ message: "Users details sent", data: users }).status(200);
    return;
  } catch (err: any) {
    console.log(err);
    res.json({ message: "Internal Server Error" }).status(500);
    return;
  }
};

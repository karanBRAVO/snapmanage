import { Response, Request } from "express";
import { UserModel } from "../models/userModel";
import { compareSync, hashSync } from "bcrypt";

interface IUserData {
  name: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  dob: string;
  username: string;
  password: string;
}

export const userLoginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as IUserData;
    if (!username) {
      res.json({ message: "Username not provided." }).status(401);
      return;
    }
    if (!password) {
      res.json({ message: "Password not provided." }).status(401);
      return;
    }

    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser === null) {
      res.json({ message: "User not found | Signup required." }).json(404);
      return;
    }

    if (!compareSync(password, existingUser.password)) {
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

export const userSignupHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, dob, email, fatherName, name, phoneNumber } =
      req.body as IUserData;
    if (!name) {
      res.json({ message: "Name not provided." }).status(401);
      return;
    }
    if (!dob) {
      res.json({ message: "dob not provided." }).status(401);
      return;
    }
    if (!email) {
      res.json({ message: "Email not provided." }).status(401);
      return;
    }
    if (!fatherName) {
      res.json({ message: "Father name not provided." }).status(401);
      return;
    }
    if (!phoneNumber) {
      res.json({ message: "Phone number not provided." }).status(401);
      return;
    }
    if (!username) {
      res.json({ message: "Username not provided." }).status(401);
      return;
    }
    if (!password) {
      res.json({ message: "Password not provided." }).status(401);
      return;
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.json({ message: "User already exists" }).json(404);
      return;
    }

    const newUser = new UserModel({
      name,
      fatherName,
      email,
      phoneNumber,
      dob,
      username,
      password: hashSync(password, 100),
    });
    await newUser.save();

    res.json({ message: "Signup successful" }).status(200);
    return;
  } catch (err: any) {
    console.log(err);
    res.json({ message: "Internal Server Error" }).status(500);
    return;
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    res.json({ message: "image uploaded" }).status(200);
  } catch (err: any) {
    console.log(err);
    res.json({ message: "Internal Server Error" }).status(500);
  }
};

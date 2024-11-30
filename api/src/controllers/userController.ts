import { Response, Request } from "express";
import { UserModel } from "../models/userModel";
import { compareSync, hashSync } from "bcrypt";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import { StatusModel } from "../models/statusModel";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

interface IUserData {
  name: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  dob: string;
  username: string;
  password: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "snapmanage" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// export const userLoginHandler = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body as IUserData;
//     if (!username) {
//       return res.status(401).json({ message: "Username not provided." });
//     }
//     if (!password) {
//       return res.status(401).json({ message: "Password not provided." });
//     }

//     const existingUser = await UserModel.findOne({ username: username });
//     if (existingUser === null) {
//       return res
//         .status(404)
//         .json({ message: "User not found | Signup required." });
//     }

//     if (!compareSync(password, existingUser.password)) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       throw new Error("Invalid JWT secret");
//     }

//     const token = JWT.sign({ _id: existingUser._id }, jwtSecret);

//     return res.status(200).json({
//       message: "Login successful",
//       data: {
//         token,
//         name: existingUser.name,
//         username,
//       },
//     });
//   } catch (err: any) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const userSignupHandler = async (req: Request, res: Response) => {
//   try {
//     const { username, password, dob, email, fatherName, name, phoneNumber } =
//       req.body as IUserData;
//     if (!name) {
//       return res.status(401).json({ message: "Name not provided." });
//     }
//     if (!dob) {
//       return res.status(401).json({ message: "dob not provided." });
//     }
//     if (!email) {
//       return res.status(401).json({ message: "email not provided." });
//     }
//     if (!fatherName) {
//       return res.status(401).json({ message: "father name not provided." });
//     }
//     if (!phoneNumber) {
//       return res.status(401).json({ message: "phone number not provided." });
//     }
//     if (!username) {
//       return res.status(401).json({ message: "username not provided." });
//     }
//     if (!password) {
//       return res.status(401).json({ message: "password not provided." });
//     }

//     const existingUser = await UserModel.findOne({ username });
//     if (existingUser) {
//       return res.status(404).json({ message: "User already exists" });
//     }

//     const newUser = new UserModel({
//       name,
//       fatherName,
//       email,
//       phoneNumber,
//       dob,
//       username,
//       password: hashSync(password, 10),
//     });
//     await newUser.save();

//     return res.status(200).json({ message: "Signup successful" });
//     return;
//   } catch (err: any) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // if (!req.user) {
    //   return res.status(404).json({ message: "Invalid request" });
    // }

    // const { _id: userId } = req.user;
    // if (!userId) {
    //   return res.status(404).json({ message: "Token not verified" });
    // }

    const { username, name, fatherName, phone } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // const existingUser = await UserModel.findOne({
    //   _id: new mongoose.Types.ObjectId(userId),
    // });
    let existingUser = await UserModel.findOne({
      username: username,
    });
    if (!existingUser) {
      const newUser = new UserModel({
        name,
        username,
        fatherName,
        phoneNumber: phone,
      });
      existingUser = await newUser.save();
    }

    // upload the image
    const result = await streamUpload(req.file.buffer);

    const updated = await StatusModel.updateOne(
      {
        userId: existingUser._id,
      },
      { $push: { stats: { imgUrl: result.secure_url, date: Date.now() } } },
      { upsert: true }
    );

    if (!updated.acknowledged) {
      return res.status(401).json({ message: "Error uploading image" });
    }

    return res.status(200).json({ message: "Image uploaded" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

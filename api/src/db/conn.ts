import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error(`MongoDB connection url not specified in .env`);
    }

    await mongoose.connect(url);
    console.log(`Connected to Mongodb`);
  } catch (error: any) {
    console.log("Error connecting to mongodb", error);
    throw new Error(error);
  }
};

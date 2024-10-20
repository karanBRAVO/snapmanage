import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToDb } from "./db/conn";

// create the express app
const app = express();

// cors usage
app.use(
  cors({
    origin: [`${process.env.APP_URL}`, "*"],
  })
);

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port configurations
const PORT: number = Number(process.env.PORT) || 8000;

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Video Server listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error("Unhandled server startup error:", error);
  process.exit(1);
});

import { Router } from "express";
import {
  uploadImage,
  // userLoginHandler,
  // userSignupHandler,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.post("/login", userLoginHandler as any);
// router.post("/signup", userSignupHandler as any);
router.post(
  "/upload-image",
  // verifyToken,
  upload.single("image"),
  uploadImage as any
);

export default router;

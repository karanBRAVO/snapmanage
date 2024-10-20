import { Router } from "express";
import {
  uploadImage,
  userLoginHandler,
  userSignupHandler,
} from "../controllers/userController";

const router = Router();

router.post("/login", userLoginHandler);
router.post("/signup", userSignupHandler);
router.post("/user-details", uploadImage);

export default router;

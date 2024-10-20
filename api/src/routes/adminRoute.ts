import { Router } from "express";
import {
  adminLoginHandler,
  adminSignupHandler,
  getUserDetails,
} from "../controllers/adminController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", adminLoginHandler as any);
router.post("/signup", adminSignupHandler as any);
router.get("/user-details", verifyToken, getUserDetails as any);

export default router;

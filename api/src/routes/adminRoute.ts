import { Router } from "express";
import {
  adminLoginHandler,
  adminSignupHandler,
  getUserDetails,
} from "../controllers/adminController";

const router = Router();

router.post("/login", adminLoginHandler);
router.post("/signup", adminSignupHandler);
router.get("/user-details", getUserDetails);

export default router;

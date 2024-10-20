import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../controllers/adminController";

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthError("No authorization header");
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      throw new AuthError("No token provided");
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new AuthError("Invalid JWT secret");
      }

      const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

      req.user = {
        _id: decoded._id,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error during authentication",
      });
    }
  }
};

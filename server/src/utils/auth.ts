import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import User from "../models/User";

export const verifyToken = async (token: string) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    return User.findById(decoded.id);
  } catch (error) {
    throw new AuthenticationError("Invalid or expired token");
  }
};

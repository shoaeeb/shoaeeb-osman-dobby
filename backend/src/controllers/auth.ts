import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth";

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Login Succesfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({ user: req.userId });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout Succesfull" });
};

import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ message: errors.array() });
  }
  try {
    const { name, username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(401).json({ message: "Username already exists" });
    }
    const newUser = new User({
      name,
      username,
      email,
      password,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
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
    res.status(200).json({ message: "User Created Succsefully" });
  } catch (error) {
    console.log(error, "in register");
    res.status(500).json({ message: "Server Error" });
  }
};

export default register;

import express, { Router } from "express";
import register from "../controllers/users";
import { check } from "express-validator";
import { login, logout, me } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

//api/v1/signup
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  register
);

///api/v1/login
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isString(),
  ],
  login
);

router.get("/logout", logout);

router.get("/validate-token", verifyToken, me);
export default router;

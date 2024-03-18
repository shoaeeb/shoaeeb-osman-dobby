import { verify } from "crypto";
import express from "express";
import { verifyToken } from "../middleware/auth";
import { createPost, getAllPosts, getPosts } from "../controllers/posts";
import Post from "../models/Post";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/posts", verifyToken, getAllPosts);
router.get("/search", verifyToken, getPosts);

export default router;

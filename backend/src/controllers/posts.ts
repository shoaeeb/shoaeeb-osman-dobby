import { v2 as cloudinary } from "cloudinary";
import Post from "../models/Post";
import { Request, Response } from "express";
import { PostResponseType } from "../shared/types";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { name, img } = req.body;
    const result = await cloudinary.uploader.upload(img);
    console.log(req.userId);
    const newPost = new Post({
      name,
      img: result.url,
      userId: req.userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const pageSize = 5;

    const pageNumber = Number(req.query.page ? req.query.page : "1");
    const skip = (pageNumber - 1) * pageSize;
    const posts = await Post.find({ userId: req.userId })
      .skip(skip)
      .limit(pageSize);
    const total = await Post.countDocuments();
    const response: PostResponseType = {
      data: posts,
      pagination: {
        page: pageNumber,
        total,
        pages: Math.ceil(total / pageSize),
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error, "in get all posts");
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const query = constructedQuery(req.query, req.userId);
    const pageNumber = Number(req.query.page ? req.query.page : "1");
    const skip = (pageNumber - 1) * pageSize;
    const posts = await Post.find(query).skip(skip).limit(pageSize);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const constructedQuery = (query: any, userId: string) => {
  let constructedQuery: any = {};
  if (query.name) {
    constructedQuery.name = query.name;
  }
  if (userId) {
    constructedQuery.userId = userId;
  }
  return constructedQuery;
};

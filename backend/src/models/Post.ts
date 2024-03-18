import mongoose from "mongoose";
import { PostType } from "../shared/types";

const PostSchema = new mongoose.Schema<PostType>({
  name: { type: String, required: [true, "Name is required"] },
  img: { type: String, required: [true, "Image is required"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model<PostType>("Post", PostSchema);
export default Post;

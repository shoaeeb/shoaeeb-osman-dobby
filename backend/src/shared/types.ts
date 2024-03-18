import { Types } from "mongoose";

export type PostType = {
  _id: string;
  img: string;
  name: string;
  userId: Types.ObjectId;
};

export type PostResponseType = {
  data: PostType[];
  pagination: {
    page: number;
    total: number;
    pages: number;
  };
};

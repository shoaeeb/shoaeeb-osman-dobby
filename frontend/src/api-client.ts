import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { PostResponseType, PostType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const register = async (data: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/validate-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error occurred while validating token");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/logout`, {
    method: "GET",
    headers: {
      "COntent-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error occurred while logging out user");
  }
  return response.json();
};

export const login = async (data: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responeBody = await response.json();
  if (!response.ok) {
    throw new Error(responeBody.message);
  }
  return responeBody;
};

type CreatePostData = {
  name: string;
  img: string;
};

export const createPost = async (data: CreatePostData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error occurred while creating post");
  }
  return response.json();
};

export const fetchAllPosts = async (
  page?: string
): Promise<PostResponseType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/posts?page=${page || "1"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching posts");
  }
  return response.json();
};

type SearchParams = {
  name?: string;
  page?: string;
};

export const searchPostByName = async (
  searchParams: SearchParams
): Promise<PostType[]> => {
  const queryParams = new URLSearchParams();
  queryParams.append("name", searchParams.name || "");
  queryParams.append("page", searchParams.page || "");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/search?${queryParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error occurred while searching for posts");
  }
  return response.json();
};

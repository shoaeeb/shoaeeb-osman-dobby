import { useRef, RefObject, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

const CreatePost = () => {
  const fileRef: RefObject<HTMLInputElement> = useRef(null);
  const [name, setName] = useState<string>("");
  const { previewImg, handlePreviewImg, setPreviewImg } = usePreviewImg();

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(apiClient.createPost, {
    onSuccess: () => {
      showToast({ message: "Post created successfully", type: "SUCCESS" });
      setPreviewImg("");
      queryClient.invalidateQueries("fetchAllPosts");
    },
    onError: () => {
      showToast({
        message: "Error occurred while creating post",
        type: "ERROR",
      });
      setPreviewImg("");
    },
  });

  return (
    <div className="  px-5 py-1 flex flex-col border border-slate-500 max-w-lg container mx-auto">
      <input onChange={handlePreviewImg} ref={fileRef} type="file" hidden />
      <input
        type="text"
        placeholder="Enter the name of the image"
        className="px-2 py-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {previewImg && (
        <img
          src={previewImg}
          className=" flex flex-1 object-center object-cover min-h-full"
        />
      )}
      <div className="flex gap-4">
        <button
          onClick={() => fileRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-1  rounded hover:bg-blue-400"
        >
          {" "}
          Choose File
        </button>
        <button
          disabled={isLoading}
          onClick={() => {
            if (!name || !previewImg)
              return showToast({
                message: "Please select an image and enter the name",
                type: "ERROR",
              });
            mutate({ name, img: previewImg });
          }}
          className="bg-red-500 text-white px-4 py-1  rounded hover:bg-red-400 disabled:bg-gray-500"
        >
          {" "}
          Upload
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

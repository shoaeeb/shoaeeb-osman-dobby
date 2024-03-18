import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const usePreviewImg = () => {
  const [previewImg, setPreviewImg] = useState<string>("");
  const { showToast } = useAppContext();

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image"))
      return showToast({ message: "Please select an image", type: "ERROR" });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return { previewImg, handlePreviewImg, setPreviewImg };
};
export default usePreviewImg;

import { useEffect } from "react";

type toastProps = {
  message: string;
  type: "ERROR" | "SUCCESS";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: toastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? " fixed top-4 right-4 z-50 p-5 rounded-md text-white max-w-md bg-green-500"
      : "  fixed top-4 right-4 z-50 p-5 rounded-md text-white max-w-md bg-red-500";

  return (
    <div className={styles}>
      <div className="flex items-center justify-center">
        <p className="text-lg ">{message}</p>
      </div>
    </div>
  );
};

export default Toast;

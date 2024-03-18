import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  username: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "User registered successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutate(data);
  });
  return (
    <>
      <div className="container mx-auto pb-11">
        <div className="flex justify-end py-1">
          <Link
            to="/login"
            className="px-4  py-2 bg-blue-500 text-white rounded hover:bg-blue-400 "
          >
            Login
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-5 py-2 my-auto border bormeder-slate-300  max-w-md ">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col flex-1 p-2 font-bold text-sm">
            Name:
            <input
              type="text"
              className="w-full px-2 py-1 rounded border border-gray-500"
              {...register("name", {
                required: "This field is required",
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="flex flex-col flex-1 p-2 font-bold text-sm">
            Email:
            <input
              type="email"
              className="w-full px-2 py-1 rounded border border-gray-500"
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="flex flex-col flex-1 p-2 font-bold text-sm">
            UserName:
            <input
              type="text"
              className="w-full px-2 py-1 rounded border border-gray-500"
              {...register("username", {
                required: "This field is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </label>
          <label className="flex flex-col flex-1 p-2 font-bold text-sm">
            Password:
            <input
              type="password"
              className="w-full px-2 py-1 rounded border border-gray-500"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 p-2 text-white font-bold hover:bg-blue-500 disabled:bg-gray-500"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;


"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginForm } from "../components/LoginForm";
import { LoginImage } from "../components/LoginImage";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
  } = useLogin();

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer />

      <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <LoginImage />
      </div>
    </div>
  );
}


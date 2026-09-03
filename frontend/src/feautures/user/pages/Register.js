
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RegisterForm } from "../components/RegisterForm";
import { RegisterImage } from "../components/RegisterImage";

import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const {
    formData,
    kullaniciStorage,
    handleChange,
    handleSubmit,
    isLoading,
  } = useRegister();

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer />

      <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          kullaniciStorage={kullaniciStorage}
          isLoading={isLoading}
        />

        <RegisterImage />
      </div>
    </div>
  );
}


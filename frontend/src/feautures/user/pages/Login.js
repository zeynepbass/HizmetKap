"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "@/features/user/api"

import { LoginForm } from "../components/LoginForm";
import { LoginImage } from "../components/LoginImage";

export default function Girisyap() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.dismiss();

      const res = await Login(formData);

      toast.success("Giriş başarılı!", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.setItem(
        "kullanici",
        JSON.stringify(res.data.kullanici)
      );

      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; max-age=${
          60 * 60 * 24
        }`;
      }

      setTimeout(() => {
        router.push("/ana-sayfa");
      }, 3000);
    } catch (error) {
      toast.dismiss();

      toast.error(
        error.response?.data?.message || "Bir hata oluştu",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer />

      <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">

        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <LoginImage />

      </div>
    </div>
  );
}
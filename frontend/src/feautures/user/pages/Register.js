"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { register } from "@/features/feed/api";

import { RegisterForm } from "../components/RegisterForm";
import { RegisterImage } from "../components/RegisterImage";

export default function Kayitol() {
  const router = useRouter();

  const [kullaniciStorage, setKullaniciStore] = useState("");

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
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
      const res = await register(formData);

      if (res.data && res.data.yeniKullanici) {
        toast.success(res.data.message || "Kayıt başarılı!", {
          position: "top-right",
          autoClose: 3000,
        });

        localStorage.setItem(
          "kullanici",
          JSON.stringify(res.data.yeniKullanici)
        );

        localStorage.removeItem("kullaniciAdi");

        setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        toast.error("Kayıt sırasında beklenmedik bir cevap alındı", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Bir hata oluştu",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    const store = JSON.parse(
      localStorage.getItem("kullanici")
    );

    setKullaniciStore(store);
  }, []);

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer />

      <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">

        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          kullaniciStorage={kullaniciStorage}
        />

        <RegisterImage />

      </div>
    </div>
  );
}
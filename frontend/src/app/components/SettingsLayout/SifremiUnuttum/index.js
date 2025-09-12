"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email:"",
    yeniParola: "",
    yeniParolaTekrar: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5233/sifremi-unuttum", formData);
      toast.loading(res.data.message, { position: "top-right", autoClose: 3000 });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Bir hata oluştu", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-50">
      <ToastContainer />
      <div className="flex justify-center items-center w-[80%]">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg p-10 shadow-lg bg-white">
            <h1 className="text-3xl font-bold mb-2 text-gray-600">Şifre Değiştir</h1>
            <p className="text-gray-600 mb-6">
              Şifreni güncellemek için lütfen sırasıyla email ve yeni şifreni gir.
            </p>

            <div>
              <label className="font-semibold mb-1 block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email adresinizi girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>

            <div>
              <label className="font-semibold mb-1 block text-gray-600">Yeni Şifre</label>
              <input
                type="password"
                name="yeniParola"
                value={formData.yeniParola}
                onChange={handleChange}
                placeholder="Yeni şifreyi girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>

            <div>
              <label className="font-semibold mb-1 block text-gray-600">Yeni Şifre Tekrar</label>
              <input
                type="password"
                name="yeniParolaTekrar"
                value={formData.yeniParolaTekrar}
                onChange={handleChange}
                placeholder="Yeni şifreyi tekrar girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-[rgb(255,190,60)] text-white px-4 py-2 rounded-md hover:bg-[rgb(255,127,60)] transition"
            >
              Güncelle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;

"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import KayitOl from "../../../components/KayitOl"
const Index = () => {
  const [form, setForm] = useState({ ad: "", soyad: "", email: "" });
  const [telefon, setTelefon] = useState("");
  const [resim, setResim] = useState(null);
  const [preview, setPreview] = useState("/profile.jpg");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResim(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const kullaniciStorage = JSON.parse(localStorage.getItem("kullanici"));
  const veri=kullaniciStorage.yeniKullanici || kullaniciStorage.kullanici
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ad", form.ad);
    formData.append("soyad", form.soyad);
    formData.append("email", form.email);
    formData.append("telefon", telefon);

    if (resim) formData.append("resim", resim);

    try {   
      
      const res = await axios.put(
        `http://localhost:5233/hesap/${veri._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Bilgiler başarıyla güncellendi!", {
        position: "top-right",
        autoClose: 3000
      });


      localStorage.setItem("kullanici", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası veya güncelleme başarısız!", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      {kullaniciStorage ? <div className="flex flex-col items-center pt-10">
        <ToastContainer />
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="Profil Fotoğrafı"
            className="rounded-2xl w-40 h-40 object-cover"
          />
          <label className="cursor-pointer text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            Fotoğraf Seç
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-md p-4 rounded-lg">
            <div>
              <label className="font-bold block mb-1">Ad</label>
              <input
                type="text"
                name="ad"
                value={form.ad}
                onChange={handleChange}
                placeholder="Adınızı girin"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Soyad</label>
              <input
                type="text"
                name="soyad"
                value={form.soyad}
                onChange={handleChange}
                placeholder="Soyadınızı girin"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email adresinizi girin"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Telefon</label>
              <PhoneInput
                className="p-2"
                placeholder="(5xx) xxx xx xx"
                value={telefon}
                onChange={setTelefon}
              />
            </div>

            <button className="mt-4 bg-[rgb(255,190,60)] text-white px-4 py-2 rounded-md hover:bg-[rgb(255,127,60)] transition">
              Kaydet
            </button>
          </form>
        </div>
      </div> : <KayitOl />}

    </>


  );
};

export default Index;

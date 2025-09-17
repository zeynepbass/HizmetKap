"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KayitOl from "../../../components/KayitOl"
import {updateHesap} from "../../../services/api"
const Index = () => {
  const [form, setForm] = useState({ ad: "", soyad: "", email: "" });
  const [telefon, setTelefon] = useState("");
  const [resim, setResim] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResim(file);
    if (file) setPreview(URL.createObjectURL(file));
    
  };

  const kullaniciStorage = JSON.parse(localStorage.getItem("kullanici"));
  const id = kullaniciStorage.kullanici?.id
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ad", form.ad);
    formData.append("soyad", form.soyad);
    formData.append("email", form.email);
    formData.append("telefon", telefon);

    if (resim) formData.append("resim", resim);

    try {
      const res = await updateHesap(id, formData);


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
          {resim ?     <img
            src={preview}
            alt="Profil Fotoğrafı"
            className="rounded-2xl w-40 h-40 object-cover border-1 border-gray-200"
          /> : null  }
     
          <label className="cursor-pointer text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            Fotoğraf Seç
            <input
              type="file"
              className="hidden mx-auto p-3 cursor-pointer rounded-md border border-gray-100 text-[rgb(242,247,250)] hover:text-[rgb(242,247,250)] transition-colors duration-300 mt-2"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-md p-4 rounded-lg">
            <div>

              <input
                type="text"
                name="ad"
                value={form.ad}
                onChange={handleChange}
                placeholder="Ad*"
                className="w-full rounded-lg  p-2 focus:outline-none focus:ring-2  focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
              />
            </div>

            <div>

              <input
                type="text"
                name="soyad"
                value={form.soyad}
                onChange={handleChange}
                placeholder="Soyad*"
                className="w-full rounded-lg  p-2 focus:outline-none focus:ring-2  focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
              />
            </div>

            <div>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email*"
                className="w-full rounded-lg  p-2 focus:outline-none focus:ring-2  focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
              />
            </div>

            <div>
              <label className="font-bold block mb-1 text-gray-300">Telefon*</label>
              <PhoneInput
                className="p-2"
                placeholder="(5xx) xxx xx xx"
                value={telefon}
                onChange={setTelefon}
              />
            </div>

            <button className="w-[50%] rounded-4xl  mx-auto p-3 cursor-pointer  bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2">
              Kaydet
            </button>
          </form>
        </div>
      </div> : <KayitOl />}

    </>


  );
};

export default Index;

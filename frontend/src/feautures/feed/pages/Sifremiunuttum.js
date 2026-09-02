"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { SifremiUnuttum } from "@/app/services/api";
import "react-toastify/dist/ReactToastify.css";
import {Button} from "@/components/atoms"
export default function Sifreniunuttum (){
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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
  
    if (
      !formData.email ||
      !formData.yeniParola ||
      !formData.yeniParolaTekrar
    ) {
      toast.error("Lütfen tüm alanları doldurun!", {
        position: "top-right",
        autoClose: 3000,
      });
      return; 
    }
  

    if (formData.yeniParola !== formData.yeniParolaTekrar) {
      toast.error("Yeni şifreler eşleşmiyor!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const res = await SifremiUnuttum(formData);
  
      toast.success(res.data?.message || "Şifre başarıyla güncellendi!", {
        position: "top-right",
        autoClose: 3000,
      });
  
      localStorage.clear();
  
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası veya güncelleme başarısız!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-50">
      <ToastContainer />
      <div className="flex justify-center items-center w-[80%]">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg p-10 shadow-lg bg-white">
            <h1 className="text-3xl font-bold p-4 text-center text-gray-400">
              ŞİFRE DEĞİŞTİR
            </h1>
            <p className='text-gray-500 text-center'>
              Şifreni güncellemek için lütfen sırasıyla email ve yeni şifreni gir.
            </p>

            <div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="w-full bg-[rgb(242,247,250)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>

            <div>

              <input
                type="password"
                name="yeniParola"
                value={formData.yeniParola}
                onChange={handleChange}
                placeholder="Yeni şifre*"
                className="w-full bg-[rgb(242,247,250)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>

            <div>

              <input
                type="password"
                name="yeniParolaTekrar"
                value={formData.yeniParolaTekrar}
                onChange={handleChange}
                placeholder="Yeni Şifre Tekrar*"
                className="w-full bg-[rgb(242,247,250)] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,60)]"
              />
            </div>
            <Button
          type="submit"
          className="w-[50%] rounded-4xl  mx-auto p-3 cursor-pointer  bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
        >
          Güncelle
</Button>
     
          </form>
        </div>
      </div>
    </div>
  );
};



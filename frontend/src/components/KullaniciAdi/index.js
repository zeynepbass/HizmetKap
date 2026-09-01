"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {passwordSend} from "../../services/api"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Index = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        kullaniciAdi: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      

        if (!formData.kullaniciAdi || formData.kullaniciAdi.trim() === "") {
          toast.error("Kullanıcı adı boş olamaz!", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
      
        try {
          const res = await passwordSend(formData);
      
          toast.success(res.data?.message || "İşlem başarılı!", {
            position: "top-right",
            autoClose: 3000,
          });
      
          setTimeout(() => {
            router.push("/ana-sayfa");
          }, 3000);
        } catch (error) {
          toast.error(error.response?.data?.message || "Bir hata oluştu", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };
      
      
    return (
        <div className="flex justify-center items-center min-h-screen bg-white-50 ">
            <ToastContainer />
            <div className="flex items-center justify-center w-[50%] px-4 ">
                <form onSubmit={handleSubmit} className=' h-[50%] flex shadow-md flex-col gap-1 border border-gray-100  rounded-2xl p-10'>
                    <h1 className="text-xl font-bold p-4 text-center text-gray-400">
                       KULLANICI ADI İLE GİRİŞ YAP
                    </h1>
                    <p className='text-gray-400 text-center'>Güvenliğiniz için yalnızca kendi cihazlarınızdan giriş yapın.</p>
             


                    <input
                        type="text"
                        name="kullaniciAdi"
                        value={formData.kullaniciAdi}
                        onChange={handleChange}
                        placeholder="Kullanıcı adınız*"
                        className=" focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)] rounded-md p-2 focus:outline-none focus:ring-2"
                    />



                    <button
                        type="submit"
                        className="w-[50%] rounded-4xl  mx-auto p-3 cursor-pointer  bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

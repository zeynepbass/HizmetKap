"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Login} from "../../services/api"
const Index = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        parola: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          toast.dismiss(); 
          const res = await Login(formData); 
      
          toast.success("Giriş başarılı!", { position: "top-right", autoClose: 3000 });
      
          localStorage.setItem("kullanici", JSON.stringify(res.data.kullanici));
      
          if (res.data.token) {
            document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24}`;
          }
      
          setTimeout(() => {
            router.push("/ana-sayfa");
          }, 3000);
        } catch (error) {
          toast.dismiss();
          toast.error(error.response?.data?.message || "Bir hata oluştu", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };
      
      

    return (
        <div className="container mx-auto min-h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">


                <div className="col-span-12 md:col-span-6  flex justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="w-[90%] flex flex-col gap-1 rounded-lg p-10"
                    >
                        <h1 className="text-4xl font-bold p-4 text-center text-gray-400">
                            GİRİŞ YAP
                        </h1>
                        <p className='text-gray-500 text-center'>Güvenliğiniz için yalnızca kendi cihazlarınızdan giriş yapın.</p>
                        <br />
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email*"
                            className=" rounded-lg p-2 mt-2 focus:outline-none focus:ring-2  focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                        />


                        <input
                            type="password"
                            name="parola"
                            value={formData.parola}
                            onChange={handleChange}
                            placeholder="Parola*"
                            className=" rounded-lg  p-2 focus:outline-none focus:ring-2  focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
                        />

                        <div className="flex justify-between mt-2">
                            <Link href="/sifremi-unuttum">
                                <span className="text-gray-400 cursor-pointer">
                                    Şifremi unuttum
                                </span>
                            </Link>
                            <span
                                className="text-md font-bold text-gray-400 text-right pr-2 cursor-pointer"
                                onClick={() => router.push("/kayit-ol")}
                            >
                                Kayit ol
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-[50%] rounded-4xl  mx-auto p-3 cursor-pointer  bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
                        >
                            Giriş Yap
                        </button>
                        <p className="text-center text-black font-bold mt-2 ">
                            <span>veya</span>
                        </p>
                        <div className='flex gap-1'>
                            <button
                                type="button"
                                onClick={() => router.push("/kullanici-adi-giris")}
                                className="w-[50%]  mx-auto p-3 cursor-pointer rounded-md border border-gray-100 text-gray-400 hover:text-300 transition-colors duration-300 mt-2"
                            >
                                Kullanıcı adı ile giriş yap
                            </button>


                        </div>

                    </form>
                </div>

   
                  <div className="col-span-12 md:col-span-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/login.jpg')] bg-cover bg-center"></div>

                    <div className="absolute inset-0 bg-black/10"></div>
                   
                </div>
     
            </div>
        </div>


    )
}

export default Index

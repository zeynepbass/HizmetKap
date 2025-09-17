"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {handleRegisterPost} from "../../services/api"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Index = () => {
    const kullaniciStorage = JSON.parse(localStorage.getItem("kullanici"));
    const router = useRouter()
    const [formData, setFormData] = useState({
        ad: "",
        soyad: "",
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
        e.preventDefault()
        try {
            const res = await handleRegisterPost(formData);
            toast.success("Kayıt başarılı!", { position: "top-right", autoClose: 3000 })
            localStorage.setItem("kullanici", JSON.stringify(res.data))
            setTimeout(() => router.push("/"), 100)
        } catch (error) {
            toast.error(error.response?.data?.message || "Bir hata oluştu", { position: "top-right", autoClose: 3000 })
        }
    }

    return (
        <div className="container mx-auto min-h-screen flex items-center justify-center">
            <ToastContainer />
            <div className="grid grid-cols-12 w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">

   
                <div className="col-span-12 md:col-span-6 flex justify-center items-center bg-white p-8">
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

                        <h1 className="text-4xl font-bold text-center text-gray-700">
                            {kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
                        </h1>

                        <p className='text-[rgb(242,247,250)] text-center text-sm'>
                            Kayıt olarak <span className="underline cursor-pointer">Gizlilik Politikası</span> ve <span className="underline cursor-pointer">Kullanım Şartlarını</span> kabul etmiş olursunuz.
                        </p>

                        <div className='flex flex-col md:flex-row gap-4'>
                            <input
                                type="text"
                                name="ad"
                                value={formData.ad}
                                onChange={handleChange}
                                placeholder="Adınız"
                                className="flex-1 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                            />
                            <input
                                type="text"
                                name="soyad"
                                value={formData.soyad}
                                onChange={handleChange}
                                placeholder="Soyadınız"
                                className="flex-1 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                            />
                        </div>

                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email adresiniz"
                            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                        />

                        <input
                            type="password"
                            name="parola"
                            value={formData.parola}
                            onChange={handleChange}
                            placeholder="Parolanız"
                            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-full p-3 bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-4"
                        >
                            {kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
                        </button>

                    </form>
                </div>


                <div className="col-span-12 md:col-span-6 relative flex items-center justify-center ">
                    <div className="absolute inset-0 bg-[url('/kayit.jpg')] bg-cover bg-center"></div>

                    <div className="absolute inset-0 bg-black/10"></div>
                   
                </div>

            </div>
        </div>
    )
}

export default Index

"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
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
            const res = await axios.post("http://localhost:5233/kayit", formData)
             toast.loading("Kayıt başarılı!", { position: "top-right", autoClose: 3000 })
          const kullanici=localStorage.setItem("kullanici", JSON.stringify(res.data));
         localStorage.removeItem("kullaniciAdi")
               {kullanici ?  null : setTimeout(() => {
                router.push("/")
            }, 100) }
           
        } catch (error) {
            toast.error(error.response?.data?.message || "Bir hata oluştu", { position: "top-right", autoClose: 3000 })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white-50">
            <ToastContainer />
            <div className="flex items-center justify-center w-[70%] mb-50">
                <form onSubmit={handleSubmit} className='w-[60%] h-[50%] flex shadow-md flex-col gap-1 border border-gray-100 rounded-lg p-10'>
                    <h1 className='text-4xl font-bold p-4 text-center text-gray-600'>                   {kullaniciStorage ?    "Kayıt Ol" : "Kaydet"} </h1>
                    
                    <label className='text-gray-500 font-bold'>Ad*</label>
                    <input
                        type="text"
                        name="ad"
                        value={formData.ad}
                        onChange={handleChange}
                        placeholder="Adınızı giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <label className='text-gray-500 font-bold'>Soyad*</label>
                    <input
                        type="text"
                        name="soyad"
                        value={formData.soyad}
                        onChange={handleChange}
                        placeholder="Soyadınızı giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <label className='text-gray-500 font-bold'>Email*</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email adresinizi giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <label className='text-gray-500 font-bold'>Parola*</label>
                    <input
                        type="password"
                        name="parola"
                        value={formData.parola}
                        onChange={handleChange}
                        placeholder="Parolanızı giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    /> 


                   


                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-[rgb(255,190,60)] text-white hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
                    >
                   {kullaniciStorage ?    "Kayıt Ol" : "Kaydet"} 
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
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
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5233/sifre-gonder", formData)
            toast.loading("Kayıt başarılı!", { position: "top-right", autoClose: 3000 })
              localStorage.setItem("kullaniciAdi",JSON.stringify(res.data))
            setTimeout(() => {
                router.push("/ana-sayfa") 
            }, 3000)
        } catch (error) {
            toast.error(error.response?.data?.message || "Bir hata oluştu", { position: "top-right", autoClose: 3000 })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white-50">
            <ToastContainer />
            <div className="flex items-center justify-center w-[50%] px-4">
                <form onSubmit={handleSubmit} className='w-[60%] h-[50%] flex shadow-md flex-col gap-1 border border-gray-100 rounded-lg p-10'>
                    <h1 className='text-4xl font-bold p-4 text-center text-gray-600'>Giriş Yap</h1>
                    
                    <label className='text-gray-500 font-bold'>Kullanıcı adınız*</label>
                    <input
                        type="text"
                        name="kullaniciAdi"
                        value={formData.kullaniciAdi}
                        onChange={handleChange}
                        placeholder="Kullanıcı adınızı giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

         

                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-[rgb(255,190,60)] text-white hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

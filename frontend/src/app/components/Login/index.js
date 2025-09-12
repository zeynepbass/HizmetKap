"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
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
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5233/login", formData)
            toast.loading("Giriş başarılı!", { position: "top-right", autoClose: 3000 })
             localStorage.setItem("kullanici",JSON.stringify(res.data))
             if (res.data.token) {
                document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24}`; 
            }
    
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
                <form onSubmit={handleSubmit}  className='w-[60%] h-[50%] flex shadow-md flex-col gap-1 border border-gray-100 rounded-lg p-10'>
                    <h1 className='text-4xl font-bold p-4 text-center text-gray-600'>Hesabınıza giriniz</h1>
           
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


                    <div className='flex justify-between'>
                    <Link href="/sifremi-unuttum">
                        <span className='text-gray-400 cursor-pointer'>Şifremi unuttum</span>
   
                    </Link>
                    <span className='text-md font-bold text-gray-600 text-right pr-2 cursor-pointer' onClick={()=>router.push("/kayit-ol")}>Kayit ol</span>
                    </div>

               
                    <p className='text-center text-gray-400 mt-2'><span>veya</span></p>

                    <button
                        type="button"
                        onClick={() => router.push("/kullanici-adi-giris")}
                        className="w-full p-3 cursor-pointer rounded-md border border-gray-100 text-gray-400 hover:text-gray-400 transition-colors duration-300 mt-2"
                    >
                        Kullanıcı adı ile giriş yap
                    </button>

                    <button
                        type="submit"

                        className="w-full p-3 cursor-pointer rounded-md bg-[rgb(255,190,60)] text-white hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

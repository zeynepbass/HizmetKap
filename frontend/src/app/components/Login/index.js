"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Index = () => {
    const router = useRouter()

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 '>
      <div className="flex items-center justify-center w-[50%] px-4">
                <form className='w-[60%] h-[50%] flex shadow-md flex-col gap-1 border border-gray-100 rounded-lg p-10'>
                    <h1 className='text-4xl font-bold p-4 text-center text-gray-600'>Hesabınıza giriniz</h1>

                    <label className='text-gray-500 font-bold'>Email*</label>
                    <input
                        type="text"
                        placeholder="Email adresinizi giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
<br/>
                    <label className='text-gray-500 font-bold'>Parola*</label>
                    <input
                        type="password"
                        placeholder="Parolanızı giriniz"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <Link href="/sifremi-unuttum">
                        <span className='text-gray-400 cursor-pointer'>Şifremi unuttum</span>
                    </Link>

                    <p className='text-center text-gray-400 mt-2'><span>veya</span></p>

                    <button
                        type="button"
                        onClick={() => router.push("/telefon-numarasi-giris")}
                        className="w-full p-3 rounded-md border border-gray-100 text-gray-400 hover:text-gray-400 transition-colors duration-300 mt-2"
                    >
                        Telefon numara ile giriş yap
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/ana-sayfa")}
                        className="w-full p-3 rounded-md bg-amber-600 text-white hover:text-gray-50 hover:bg-amber-400 transition-colors duration-300 mt-2"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

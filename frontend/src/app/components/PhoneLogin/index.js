"use client"
import React,{useState} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/navigation'

const Index = () => {
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        router.push("/");
    }
    const [value, setValue] = useState("")
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-50 '>
         <div className="flex items-center justify-center w-[50%] px-4">
                <form className='w-[60%] h-[50%] shadow-md flex flex-col gap-1 border border-gray-100 rounded-lg p-10'>
                    <h1 className='text-4xl font-bold p-4 text-center text-gray-600'>Hesabınıza giriniz</h1>

                    <label className='text-gray-500 font-bold'>Telefon no giriniz*</label>

    <PhoneInput
    className='p-2'
      placeholder="(5xx) xxx xx xx"
      value={value}
      onChange={setValue}/>
  
                    <br />
                    <button
                        onClick={handleLogin}
                        className="w-full p-3 rounded-md bg-amber-600 text-white hover:text-gray-50 hover:bg-amber-400 transition-colors duration-300 mt-4"
                    >
                        Giriş yap
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Index

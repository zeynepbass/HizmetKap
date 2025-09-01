
"use client"
import React,{useState} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const Index = () => {
        const [value, setValue] = useState("")
    return (


        <div className="flex flex-col items-center pt-10">


            <div className="flex flex-col w-full rounded-xl  gap-1 justify-center items-center">

                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/profile.jpg"
                        alt="Profil Fotoğrafı"
                        className="rounded-2xl w-40 h-40 object-cover"
                    />
                    <button className="text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                        Fotoğraf Düzenle
                    </button>
                </div>

                <div className="w-full max-w-lg">
                    <form className="flex flex-col gap-4  shadow-md p-4 rounded-lg">
                        <div>
                            <label className="font-bold block mb-1">Ad</label>
                            <input
                                type="text"
                                placeholder="Adınızı girin"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div>
                            <label className="font-bold block mb-1">Soyad</label>
                            <input
                                type="text"
                                placeholder="Soyadınızı girin"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>

                        <div>
                            <label className="font-bold block mb-1">Email</label>

                            <input
                                type="email"
                                placeholder="Email adresinizi girin"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
<div>
<label className="font-bold block mb-1">Telefon no giriniz</label>
<span className='text-gray-400 text-[15px]'>
Doğrudan iletişim kurmak için teklif verenlerin telefon numarana ihtiyacı var. Değişiklikler aktif taleplerin için iletişim tercihlerini etkilemeyip yenileri için geçerli olacak.</span>
<PhoneInput
className='p-2'
  placeholder="(5xx) xxx xx xx"
  value={value}
  onChange={setValue}/>
</div>
                        <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600">
                            Kaydet
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Index;

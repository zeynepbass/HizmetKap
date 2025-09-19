"use client";
import React, { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from "next/navigation";
import {accountDelete,updateAccount} from "../../../services/api"
const Index = () => {

    const items = [
        { title: "Hesabı dondur", image: "9318694.jpg", content: "Verilerini kaybetmeden hesabını geçici olarak dondurabilir, istediğin zaman giriş yaparak tekrar aktifleştirebilirsin..", baslik: "Araya mı ihtiyacın var?", paragraf: "Hesabını devre dışı bıraktığında hesabın dondurulacak ve platformdan çıkış yapacaksın. Hesap dondurma işlemi geri alınabilir. İstediğin zaman giriş yaparak hesabını tekrar aktifleştirebilirsin ve bilgilerine tekrar erişebilirsin. Kişisel verilerin hakkında bilgi edinmek istiyorsan Aydınlatma Metnimize göz atabilirsin.", button: "Hesabımı dondur" },
        { title: "Hesabımı sil", image: "accound-deleted.jpg", content: "Tüm verilerini kalıcı olarak silebilirsin. Unutma, silmiş olduğun hesabına tekrar ulaşamazsın.", baslik: "Hesabını silmek istemene üzüldük...", paragraf: "Hesabını devre dışı bıraktığında hesabın dondurulacak ve platformdan çıkış yapacaksın. Hesap dondurma işlemi geri alınabilir. İstediğin zaman giriş yaparak hesabını tekrar aktifleştirebilirsin ve bilgilerine tekrar erişebilirsin. Kişisel verilerin hakkında bilgi edinmek istiyorsan Aydınlatma Metnimize göz atabilirsin.", button: "Hesabımı sil" },
    ];
    const [openIndex, setOpenIndex] = useState(null);
    const [icon, setIcon] = useState(false);
    const router = useRouter();
    const toggle = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
            setIcon(false);
        } else {
            setOpenIndex(index);
            setIcon(true);
        }
    };
    const handleDurumDegistir = async () => {
        try {
          const kullanici = JSON.parse(localStorage.getItem("kullanici"));
          const result = await updateAccount(kullanici.kullanici.id, false);
      
          if (result.success) {
            localStorage.clear();
            router.push("/");
          } else {
            alert("Hesap durumu güncellenemedi");
          }
        } catch (error) {
          alert("Hesap durumu güncellenemedi");
        }
      };
    const handleHesapSil = async () => {
        try {

            const kullanici = JSON.parse(localStorage.getItem("kullanici"));
     await accountDelete(kullanici.kullanici.id)

            localStorage.clear();
            router.push("/")
        } catch (error) {
            alert("Hesap durumu güncellenemedi");
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center pt-10">
            <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white p-8 rounded-2xl shadow-lg gap-10 justify-center items-start">
                <div className="w-full flex flex-col justify-center items-center">


                    <div className="flex flex-col gap-4 p-4">
                        {items.map((item, index) => (
                            <div key={index}>
                                <h1
                                    className="text-xl text-gray-600 font-bold flex items-center justify-between cursor-pointer"
                                    onClick={() => toggle(index)}
                                >
                                    {item.title}
                                    {openIndex === index ? <KeyboardArrowDownIcon /> : <ArrowForwardIosIcon />}
                                </h1>

                                <p className="text-gray-500 mb-6">
                                    {item.content}
                                </p>
                            </div>

                        ))}
                    </div>


                    {openIndex !== null && items[openIndex] && (
                        <div className="flex justify-center items-center h-auto flex-col w-[60%]">
                                 <br/>
                            <h6 className="pb-4 font-bold text-xl m-auto text-gray-500">{items[openIndex].baslik} </h6>
                       
                            <img src={items[openIndex].image} width="50%" height="30%" className="" />
                            <p className='font-bold text-gray-400 text-md'>{items[openIndex].paragraf}</p>
                            <button
                                onClick={() => {
                                    if (openIndex === 0) {
                                        handleDurumDegistir();
                                    } else if (openIndex === 1) {
                                        handleHesapSil();
                                    }
                                }}
                                className="p-3 rounded-md font-bold mt-5 text-[rgb(78,36,77)] mx-auto cursor-pointer underline hover:text-[rgb(255,176,73)]"
                            >
                                {items[openIndex].button}
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;

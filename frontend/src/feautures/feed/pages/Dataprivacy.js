"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  accountDelete,
  updateAccount,
} from "@/services/api";

import { DataAccountOptions } from "../components/DataAccountOptions";
import { DataAccountAction } from "../components/DataAccountAction";

export default function Verigizlilik() {
  const router = useRouter();

  const items = [
    {
      title: "Hesabı dondur",
      image: "9318694.jpg",
      content:
        "Verilerini kaybetmeden hesabını geçici olarak dondurabilir, istediğin zaman giriş yaparak tekrar aktifleştirebilirsin..",
      baslik: "Araya mı ihtiyacın var?",
      paragraf:
        "Hesabını devre dışı bıraktığında hesabın dondurulacak ve platformdan çıkış yapacaksın. Hesap dondurma işlemi geri alınabilir. İstediğin zaman giriş yaparak hesabını tekrar aktifleştirebilirsin ve bilgilerine tekrar erişebilirsin. Kişisel verilerin hakkında bilgi edinmek istiyorsan Aydınlatma Metnimize göz atabilirsin.",
      button: "Hesabımı dondur",
    },
    {
      title: "Hesabımı sil",
      image: "accound-deleted.jpg",
      content:
        "Tüm verilerini kalıcı olarak silebilirsin. Unutma, silmiş olduğun hesabına tekrar ulaşamazsın.",
      baslik: "Hesabını silmek istemene üzüldük...",
      paragraf:
        "Hesabını devre dışı bıraktığında hesabın dondurulacak ve platformdan çıkış yapacaksın. Hesap dondurma işlemi geri alınabilir. İstediğin zaman giriş yaparak hesabını tekrar aktifleştirebilirsin ve bilgilerine tekrar erişebilirsin. Kişisel verilerin hakkında bilgi edinmek istiyorsan Aydınlatma Metnimize göz atabilirsin.",
      button: "Hesabımı sil",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) =>
      prev === index ? null : index
    );
  };

  const handleDurumDegistir = async () => {
    try {
      const kullanici = JSON.parse(
        localStorage.getItem("kullanici")
      );

      const result = await updateAccount(
        kullanici.kullanici.id,
        false
      );

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
      const kullanici = JSON.parse(
        localStorage.getItem("kullanici")
      );

      await accountDelete(kullanici.kullanici.id);

      localStorage.clear();
      router.push("/");
    } catch (error) {
      alert("Hesap durumu güncellenemedi");
    }
  };

  const handleAction = () => {
    if (openIndex === 0) {
      handleDurumDegistir();
    }

    if (openIndex === 1) {
      handleHesapSil();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white p-8 rounded-2xl shadow-lg gap-10 justify-center items-start">
        <div className="w-full flex flex-col justify-center items-center">

          <DataAccountOptions
            items={items}
            openIndex={openIndex}
            toggle={toggle}
          />

          {openIndex !== null && items[openIndex] && (
            <DataAccountAction
              item={items[openIndex]}
              handleAction={handleAction}
            />
          )}

        </div>
      </div>
    </div>
  );
}

"use client";

import { DataAccountOptions } from "../components/DataAccountOptions";
import { DataAccountAction } from "../components/DataAccountAction";

import { useDataPrivacy } from "../hooks/useDataPrivacy";

export default function Dataprivacy() {
  const {
    openIndex,
    toggle,
    handleAction,
    isLoading,
  } = useDataPrivacy();

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
              isLoading={isLoading}
            />
          )}

        </div>
      </div>
    </div>
  );
}


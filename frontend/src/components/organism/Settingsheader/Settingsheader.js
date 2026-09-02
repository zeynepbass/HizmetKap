"use client";

import { useState, useEffect } from "react";
import { useRouter,Link } from "next/navigation";

import {Button} from "@/components/atoms";

const navItems = ["Hesap Bilgilerim", "Şifre Değiştir", "Veri ve gizlilik"];

export default function Settingsheader() {
  const router = useRouter();
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("kullaniciAdi");
    if (data) setStoredData(data);
  }, []);

  const formatURL = (text) =>
    text
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/\s+/g, "-");

  const handleClick = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="w-full">
      <nav className="bg-[rgb(237,203,206)] text-[rgb(242,247,250)]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:h-16 py-4">


            <Link href="/ana-sayfa" className="flex items-center gap-2 mb-4 sm:mb-0">
              <img src="/logo-icon.png" className="w-12 h-12" alt="Hizmet Kap Logo" />
              <span className="text-[rgb(78,36,77)] font-bold text-[20px]">Hizmet Kap</span>
            </Link>


            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 items-center">
              {navItems
                .filter((item) => !(item === "Veri ve gizlilik" && storedData))
                .map((item) => (
                  <Link
                    key={item}
                    href={`/${formatURL(item)}`}
                    className="w-[120px] text-center hover:underline cursor-pointer"
                  >
                    {item}
                  </Link>
                ))}

              <span
                className="hover:underline cursor-pointer w-[120px] text-center"
                onClick={handleClick}
              >
                Çıkış yap
              </span>
            </div>

          </div>
        </div>
      </nav>


      <div className="pl-10">
      <Button
  onClick={() => router.back()}
  className="ml-4 cursor-pointer text-[rgb(237,203,206)]"
>
  <ArrowBackIcon sx={{ fontSize: 35 }} />
</Button>
      </div>
    </div>
  );
};




"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@/shared/components/atoms";
import Link from "next/link";

const navItems = ["Hesap Bilgilerim", "Veri Gizliliği"];

export function Settingsheader() {
  const router = useRouter();
  const pathname = usePathname();

  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("kullaniciAdi");

    if (data) {
      setStoredData(data);
    }
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
      <div className="flex flex-col items-center sm:h-20 sm:flex-row sm:justify-between">
        <div className="border-b border-gray-200 bg-white px-4 py-4">
          <Link href="/ana-sayfa" className="flex items-center gap-3">
            <img
              src="/sidebarLogo.png"
              alt="Hizmet Kap Logo"
              className="h-10 w-11 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-lg  text-[#4E244D]">
                Hizmet Kap
              </h1>

              <p className="text-xs text-gray-400">
                Hizmet yönetim platformu
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {navItems
            .filter(
              (item) =>
                !(item === "Veri Gizliliği" && storedData)
            )
            .map((item) => {
              const href = `/${formatURL(item)}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item}
                  href={href}
                  className={`flex items-center justify-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "underline text-[#4E244D]"
                      : "text-gray-600 hover:bg-white hover:text-[#4E244D]"
                  }`}
                >
                  {item}
                </Link>
              );
            })}

          <button
            type="button"
            onClick={handleClick}
            className="flex items-center justify-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-white hover:text-[#4E244D]"
          >
            Çıkış yap
          </button>
        </div>
      </div>

      <div className="bg-gray-100 pl-10">
        <Button
          onClick={() => router.back()}
          className="ml-4 cursor-pointer text-[rgb(237,203,206)]"
        >
          <ArrowBackIcon sx={{ fontSize: 25 }} />
        </Button>
      </div>
    </div>
  );
}

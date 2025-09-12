"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../Button";

const navItems = ["Hesap Bilgilerim", "Şifre Değiştir", "Veri ve gizlilik"];

const Navbar = () => {
  const router = useRouter();
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("kullaniciAdi");
    if (data) setStoredData(JSON.parse(data));
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
      <nav className="bg-[rgb(255,127,58)] text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/ana-sayfa">
                <span className="font-bold text-xl cursor-pointer">
                  <img src="/logo.png" width="20%" height="50" />
                </span>
              </Link>
            </div>

            <div className="hidden sm:flex space-x-6">
              {navItems
                .filter((item) => !(item === "Veri ve gizlilik" && storedData))
                .map((item) => (
                  <Link key={item} href={`/${formatURL(item)}`} style={{ width: "120px" }}>
                    <span className="hover:underline cursor-pointer">{item}</span>
                  </Link>
                ))}

              <span className="hover:underline cursor-pointer" onClick={handleClick}>
                Çıkış yap
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-10 pl-10">
        <Button />
      </div>
    </div>
  );
};

export default Navbar;

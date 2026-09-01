"use client";
import React, { useEffect, useState } from "react";
import SolSidebar from "../../components/Solsidebar";
import Header from "../../components/Header";
import LayoutSettings from "../../components/SettingsLayout";
import { usePathname, useRouter } from "next/navigation";

export function AppLayout  ({ children }){
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("kullanici") || localStorage.getItem("kullaniciAdi");

    if (stored) {
      setUser(stored);
    } else {
      router.push("/");
    }
  }, [router]);

  const isLoginPage =
    pathname === "/" ||
    pathname === "/kullanici-adi-giris" ||
    pathname === "/sifremi-unuttum" ||
    pathname === "/kayit-ol";

  const settingsPaths = [
    "/hesap-bilgilerim",
    "/veri-ve-gizlilik",
    "/sifre-degistir",
  ];
  const isSettingsPage = settingsPaths.includes(pathname);

  if (isLoginPage) return <>{children}</>;
  if (isSettingsPage) return <><LayoutSettings />{children}</>;

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">

      <div className="col-span-12 lg:col-span-3 md:col-span-4  lg:h-[100vh] md:h-[50vh] bg-gray-100 overflow-auto">
        <SolSidebar />
      </div>

      <div className="col-span-12 lg:col-span-9 md:col-span-8 flex flex-col h-full overflow-auto">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};



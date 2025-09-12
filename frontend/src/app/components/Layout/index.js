"use client";
import React, { useEffect, useState } from "react";
import SolSidebar from "../Solsidebar";
import Header from "../Header";
import LayoutSettings from "../../components/SettingsLayout";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("kullanici") || localStorage.getItem("kullaniciAdi");

    if (stored) {
      setUser(JSON.parse(stored));
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
    <div className="container-fluid grid grid-cols-12">
      <div className="col-span-3">
        <SolSidebar />
      </div>
      <div className="col-span-9">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;

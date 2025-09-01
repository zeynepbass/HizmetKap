"use client";
import React from "react";
import SolSidebar from "../Solsidebar";
import Header from "../Header";
import { usePathname } from "next/navigation";
import LayoutSettings from "../../components/SettingsLayout";

const Index = ({ children }) => {
  const pathname = usePathname();


  const isLoginPage =
    pathname === "/" ||
    pathname === "/telefon-numarasi-giris" ||
    pathname === "/sifremi-unuttum";


  const settingsPaths = [
    "/hesap-bilgilerim",
    "/veri-ve-gizlilik",
    "/sifre-degistir"
  ];
  const isSettingsPage = settingsPaths.includes(pathname);

  if (isLoginPage) {
   
    return <>{children}</>;
  }

  if (isSettingsPage) {

    return (
      <>
        <LayoutSettings />
        {children}
      </>
    );
  }


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

export default Index;

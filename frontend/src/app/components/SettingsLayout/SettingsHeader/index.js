"use client";

import React, { useState } from "react";

import Link from "next/link";
import Button from "../../Button"
const navItems = ["Hesap Bilgilerim", "Şifre Değiştir", "Veri ve gizlilik"];

const Navbar = () => {

    const formatURL = (text) => {
        return text
            .toLowerCase()
            .replace(/ç/g, "c")
            .replace(/ş/g, "s")
            .replace(/ı/g, "i")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ö/g, "o")
            .replace(/\s+/g, "-");
    };
    return (
        <>

            <nav className="bg-amber-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <span className="font-bold text-xl cursor-pointer"> <img src="/logo.png" width="20%" height="50" /></span>
                            </Link>
                        </div>

                        <div className="hidden sm:flex space-x-6">
                            {navItems.map((item) => (
                                <Link key={item} href={`/${formatURL(item)}`} style={{ width: "120px" }}>
                                    <span className="hover:underline cursor-pointer">{item}</span>
                                </Link>
                            ))}
    <Link  href="/" style={{ width: "120px" }}>
                                    <span className="hover:underline cursor-pointer">Çıkış yap</span>
                                </Link>
                        </div>
                    </div>
                </div>



            </nav>
            <div className=' pt-10 pl-10 '>
                <Button />
            </div>
        </>
    );
};

export default Navbar;

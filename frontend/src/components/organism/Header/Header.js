"use client";
import React, { useState, useEffect } from "react";

export function Header() {
  const [userControl, setUserControl] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("kullaniciAdi");
    setUserControl(stored);
  }, []);



  return (
    <>
      {userControl ? (
        <div className="grid grid-cols-2">
          <div className="col-span-12 border-gray-100 bg-[rgb(237,203,206)]">
            <h6 className="font-bold text-xl text-[rgb(242,247,250)] text-center items-center p-[2%]">
              Lütfen Profilinizi güncelleyin.
            </h6>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <div className="col-span-12 border-b border-gray-100">
            <h6 className="font-bold text-4xl text-gray-400 text-center items-center p-[2%]">
              İşlerim
            </h6>
          </div>
        </div>
      )}
    </>
  );
};



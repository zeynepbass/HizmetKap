"use client";
import React, { useState, useEffect } from "react";

const Index = () => {
  const [userControl, setUserControl] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("kullaniciAdi"));
    setUserControl(stored);
  }, []);



  return (
    <>
      {userControl ? (
        <div className="grid grid-cols-2">
          <div className="col-span-12 border-gray-100 bg-[rgb(255,127,58)]">
            <h6 className="font-bold text-xl text-white text-center items-center p-[2%]">
              Lütfen Profilinizi güncelleyin.
            </h6>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <div className="col-span-12 border-gray-100">
            <h6 className="font-bold text-4xl text-center items-center p-[5%]">
              İşlerim
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;

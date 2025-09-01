"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="flex justify-center items-center  w-[80%] ">
        <div className="w-full max-w-lg">


          <form className="flex flex-col gap-5  rounded-lg p-10 shadow-lg">
            <h1 className="text-3xl font-bold mb-2 text-gray-600">Şifre Değiştir</h1>
            <p className="text-gray-600 mb-6">
              Şifreni güncellemek için lütfen sırasıyla mevcut şifreni ve yeni şifreni gir.
            </p>
            <div>
              <label className="font-semibold mb-1 block text-gray-600">Mevcut Şifre</label>
              <input
                type="password"
                placeholder="Eski şifreyi girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="font-semibold mb-1 block text-gray-600">Yeni Şifre</label>
              <input
                type="password"
                placeholder="Yeni şifreyi girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="font-semibold mb-1 block text-gray-600">Yeni Şifre Tekrar</label>
              <input
                type="password"
                placeholder="Yeni şifreyi tekrar girin"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              onClick={handleLogin}
              className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
            >
              Güncelle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;

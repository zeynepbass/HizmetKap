
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Heading,
  Input,
} from "@/shared/components/atoms";

import { useUsername } from "../hooks/useUsername";

export default function Username() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
  } = useUsername();

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-50">
      <ToastContainer />

      <div className="flex items-center justify-center w-[50%] px-4">
        <form
          onSubmit={handleSubmit}
          className="h-[50%] bg-white flex shadow-md flex-col gap-1 border border-gray-100 rounded-2xl p-10"
        >
          <Heading
            variant="login"
            title="KULLANICI ADI İLE GİRİŞ YAP"
            desc="Güvenliğiniz için yalnızca kendi cihazlarınızdan giriş yapın."
          />

          <Input
            type="text"
            name="kullaniciAdi"
            value={formData.kullaniciAdi}
            onChange={handleChange}
            placeholder="Kullanıcı adınız*"
            className="focus:ring-[rgb(34,44,49)] mt-2 bg-[rgb(242,247,250)] rounded-md p-2 focus:outline-none focus:ring-2"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-[50%] rounded-4xl mx-auto p-3 cursor-pointer bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-3"
          >
            {isLoading ? "Gönderiliyor..." : "Giriş Yap"}
          </Button>
        </form>
      </div>
    </div>
  );
}


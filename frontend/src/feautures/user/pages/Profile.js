

"use client";

import { ToastContainer } from "react-toastify";

import { ProfileForm } from "../components/ProfilForm";
import { ProfileImage } from "../components/Profilmage";
import { useAccount } from "./hooks/useAccount";

export default function Profil() {
  const {
    form,
    telefon,
    resim,
    preview,
    kullaniciStorage,
    setTelefon,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading,
  } = useAccount();

  if (!kullaniciStorage) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />

      <ProfileImage
        preview={preview}
        resim={resim}
        handleFileChange={handleFileChange}
      />

      <ProfileForm
        form={form}
        telefon={telefon}
        setTelefon={setTelefon}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}


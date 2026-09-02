"use client";

import { ToastContainer } from "react-toastify";
import { ProfileForm } from "../components/ProfileForm";
import { ProfileImage } from "../components/ProfileImage";
import { useProfile } from "./hooks/useProfile";

export default function Profil() {
  const {
    kullaniciStorage,
    form,
    telefon,
    setTelefon,
    preview,
    resim,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useProfile();

  if (!kullaniciStorage) {
    return <Kayitol />;
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
      />
    </div>
  );
}
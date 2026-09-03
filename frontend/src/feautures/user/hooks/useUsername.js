
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { sendPassword } from "../api/user.api";

export function useUsername  () {
  const router = useRouter();

  const [formData, setFormData] = useState({
    kullaniciAdi: "",
  });

  const sendPasswordMutation = useMutation({
    mutationFn: sendPassword,

    onSuccess: (res) => {
      toast.success(
        res.data?.message || "İşlem başarılı!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      setTimeout(() => {
        router.push("/ana-sayfa");
      }, 3000);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Bir hata oluştu",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.kullaniciAdi.trim()) {
      toast.error("Kullanıcı adı boş olamaz!", {
        position: "top-right",
        autoClose: 3000,
      });

      return;
    }

    sendPasswordMutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: sendPasswordMutation.isPending,
  };
};


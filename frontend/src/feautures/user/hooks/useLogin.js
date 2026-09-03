
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Login } from "../api";

export const useLogin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });

  const loginMutation = useMutation({
    mutationFn: Login,

    onSuccess: (res) => {
      toast.success("Giriş başarılı!", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.setItem(
        "kullanici",
        JSON.stringify(res.data.kullanici)
      );

      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; max-age=${
          60 * 60 * 24
        }`;
      }

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

    toast.dismiss();

    loginMutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: loginMutation.isPending,
  };
};


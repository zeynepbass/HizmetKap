
import apiClient from "@/shared/api/client";


export const updateAccount = async (id, durum = false) => {
  const { data } = await apiClient.put(`/hesap/${id}`, {
    hesap: durum,
  });

  return data;
};


export const register = async (formData) => {
  const { data } = await apiClient.post("/kayit", formData);

  return data;
};


export const deleteAccount = async (id) => {
  const { data } = await apiClient.delete(`/hesapSil/${id}`);

  return data;
};


export const forgotPassword = async (formData) => {
  const { data } = await apiClient.post("/sifremi-unuttum", formData);

  return data;
};


export const updateAccountInfo = async (id, formData) => {
  const { data } = await apiClient.put(`/hesap/${id}`, formData);

  return data;
};


export const Login = async (formData) => {
  const { data } = await apiClient.post("/login", formData);

  return data;
};


export const sendPassword = async (formData) => {
  const { data } = await apiClient.post("/sifre-gonder", formData);

  return data;
};


export const getUsers = async () => {
  const { data } = await apiClient.get("/kullanicilar");

  return data.kullanicilar || [];
};


export const getUsergetUserDetails = async (id) => {
  const { data } = await apiClient.get(`/kullanici/${id}`);

  return data;
};


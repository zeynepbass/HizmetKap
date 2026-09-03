
import apiClient from "@/shared/api/client";


export const updateScore = async (kullaniciId, rating, comment) => {
  const { data } = await apiClient.put(`/degerlendirme/${kullaniciId}`, {
    rating,
    comment,
  });

  return data;
};


export const getConversations = async (aliciId) => {
  const { data } = await apiClient.get(`/konusmalar/${aliciId}`);

  return data || [];
};


export const deleteMessage = async (gonderenId, userId) => {
  const { data } = await apiClient.delete(
    `/${gonderenId}/${userId}`
  );

  return data;
};


export const getMessages = async (gonderenId, selectedUser) => {
  const { data } = await apiClient.get(
    `/mesajlar/${gonderenId}/${selectedUser}`
  );

  return data || [];
};


export const sendMessage = async (msgData) => {
  const { data } = await apiClient.post("/mesajlar", msgData);

  return data;
};


export const updateActive = async (id, formData) => {
  const { data } = await apiClient.put(
    `/aktifUpdated/${id}`,
    formData
  );

  return data;
};


export const getRenovationById = async (id) => {
  const { data } = await apiClient.get(`/tadilat/${id}`);

  return data;
};


export const updateStatus = async (
  id,
  currentShowText,
  forceCancel = false
) => {
  const newStatus = forceCancel
    ? "iptal"
    : currentShowText
      ? "pasif"
      : "aktif";

  const { data } = await apiClient.put(
    `/aktifTadilat/durum/${id}`,
    {
      durum: newStatus,
    }
  );

  return {
    ...data,
    newStatus,
  };
};


export const getActiveRenovations = async () => {
  const { data } = await apiClient.get("/aktifTadilat");

  return data || [];
};




export const createActiveRenovation = async (item) => {
  const { data } = await apiClient.post(
    "/aktifTadilat",
    item
  );

  return data;
};


export const getCategories = async () => {
  const { data } = await apiClient.get("/kategori");

  return data || [];
};


import axios from "axios"
import apiClient from "@/shared/api/client"
// feed
export const getAktifTadilat=async()=>{
    try {
        const res = await axios.get(`${apiClient}/aktifTadilat`);
        return res.data;
      } catch (err) {
        console.error("Aktif tadilat çekilemedi:", err);
        return [];
      }
    
}
export const getAktifTadilatDetails = async (id) => {
    if (!id) return []; 
  
    try {
      const res = await axios.get(`${apiClient}/aktifTadilat/${id}`);
      return res.data || [];
    } catch (err) {
      console.error("Aktif tadilat çekilemedi:", err);
      return [];
    }
  };
  
export const postAktifTadilat=async(item)=>{
    try {
        const res = await axios.post(`${apiClient}/aktifTadilat`,item);
        return res.data;
      } catch (err) {
        console.error("Aktif tadilat çekilemedi:", err);
        return [];
      }
    
}
export const getKategoriler = async () => {
    try {
      const res = await axios.get(`${apiClient}/kategori`);
      return res.data;
    } catch (err) {
      console.error("Kategoriler çekilemedi:", err);
      return [];
    }
  };
//user
export const updateAccount = async (id, durum = false) => {
    try {
      const res = await axios.put(`${apiClient}/hesap/${id}`, { hesap: durum });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Hesap durumu güncellenemedi:", err);
      return { success: false, error: err };
    }
  };

export const handleRegisterPost=async(formData)=>{
  try{
  const res=    await axios.post(`${apiClient}/kayit`, formData);
      return res;
  }

     catch (err) {
      console.error("Aktif tadilat çekilemedi:", err);
      return [];
    }
  
}
export const accountDelete = async (id) => {
    try {
        const res = axios.delete(
            `${apiClient}/hesapSil/${id}`
        );
      return res.data
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };
export const SifremiUnuttum = async ( formData) => {
    try {
        const res =   axios.post(`${apiClient}/sifremi-unuttum`, formData)
      return res.data
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };

export const updateHesap = async (id, formData) => {
    try {
      const res = await axios.put(`${apiClient}/hesap/${id}`, formData);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };
  export const Login=async(formData)=>{
    try {
        const res = await axios.post(`${apiClient}/login`, formData, {
       headers: { "Content-Type": "application/json" },
        });
        return { success: true, data: res.data };
      } catch (err) {
        console.error("Hesap güncellenemedi:", err);
        return { success: false, error: err };
      }
    };
    export const passwordSend = async (formData) => {
      localStorage.clear();
      try {
        const res = await axios.post(`${apiClient}/sifre-gonder`, formData, {
          headers: { "Content-Type": "application/json" },
        });
    

        const data = res.data;
  
        if (data.kullaniciAdi) {
          localStorage.setItem("kullaniciAdi", data.kullaniciAdi);
        }
    
        return { success: true, data };
      } catch (err) {
        console.error("Hesap güncellenemedi:", err);
        return { success: false, error: err };
      }
    };
    
export const fetchUsersGet = async () => {
  try {
    const res = await axios.get(`${apiClient}/kullanicilar`);

    return res.data.kullanicilar || [];
  } catch (error) {
    console.error("Kullanıcı çekme hatası:", error);
    return [];
  }
};
export const Details = async (id) => {
  try {
    const res = await axios.get(`${apiClient}/kullanici/${id}`)

    return res;
  } catch (error) {
    console.error("Kullanıcı çekme hatası:", error);
    return [];
  }
};

export const scoreUpdated = async (kullaniciId, rating, comment) => {
  try {
    const res = await axios.put(`${apiClient}/degerlendirme/${kullaniciId}`, {
      rating,
      comment,
    });
    return res.data; 
  } catch (error) {
    console.error("Kullanıcı değerlendirme hatası:", error);
    return null;
  }
};

export const fetchKonusmalarGet = async (aliciIdStored) => {
  try {
    const res = await axios.get(`${apiClient}/konusmalar/${aliciIdStored}`);
    return res.data || [];
  } catch (error) {
    console.error("Konuşmalar çekilemedi:", error);
    return [];
  } 
};
export const MessageDelete = async (gonderenId, userId) => {
  try {
    const res = await axios.delete(`${apiClient}/${gonderenId}/${userId}`);
    return res.data || [];
  } catch (error) {
    console.error("Konuşmalar çekilemedi:", error);
    return [];
  } 
};

export const fetchMessagesGet = async (gonderenId, selectedUser) => {
  try {
    const res = await axios.get(`${apiClient}/mesajlar/${gonderenId}/${selectedUser}`);
    return res.data || []; 
  } catch (error) {
    console.error("Mesajlar çekilemedi:", error);
    return [];
  }
};


export const sendMessage = async (msgData) => {
  try {
    const res = await axios.post(`${apiClient}/mesajlar`, msgData);
    return res.data;
  } catch (err) {
    console.error("Mesaj gönderilemedi:", err);
    return null;
  }
};
//feed
  export const activeUpdated = async (id, formData) => {
    try {
        const res = await axios.put(`${apiClient}/aktifUpdated/${id}`, formData, {
            headers: { "Content-Type": "application/json" },
          });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };


export const getTadilatById = async (id) => {
    try {
      const res = await axios.get(`${apiClient}/tadilat/${id}`);
      return res.data;
    } catch (err) {
      console.error("Tadilat verisi çekilemedi:", err);
      return null;
    }
  };
  export const updateDurum = async (id, currentShowText, forceIptal = false) => {

    const newDurum = forceIptal ? "iptal" : (currentShowText ? "pasif" : "aktif");
  
    try {
      await axios.put(`${apiClient}/aktifTadilat/durum/${id}`, {
        durum: newDurum,
      });
      getAktifTadilat();
      return { success: true, newDurum };
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
      return { success: false };
    }
  };

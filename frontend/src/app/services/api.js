import axios from "axios"
const API_BASE="http://localhost:5233"

export const fetchUsersGet = async () => {
  try {
    const res = await axios.get(`${API_BASE}/kullanicilar`);

    return res.data.kullanicilar || [];
  } catch (error) {
    console.error("Kullanıcı çekme hatası:", error);
    return [];
  }
};
export const fetchKonusmalarGet = async (getChat) => {
  try {
    const res = await axios.get(`${API_BASE}/konusmalar/${getChat}`);
    return res.data || [];
  } catch (error) {
    console.error("Konuşmalar çekilemedi:", error);
    return [];
  } 
};

export const fetchMessagesGet = async (gonderenId, selectedUser) => {
  try {
    const res = await axios.get(`${API_BASE}/mesajlar/${gonderenId}/${selectedUser}`);
    return res.data || []; 
  } catch (error) {
    console.error("Mesajlar çekilemedi:", error);
    return [];
  }
};


export const sendMessage = async (msgData) => {
  try {
    const res = await axios.post(`${API_BASE}/mesajlar`, msgData);
    return res.data;
  } catch (err) {
    console.error("Mesaj gönderilemedi:", err);
    return null;
  }
};

export const getAktifTadilat=async()=>{
    try {
        const res = await axios.get(`${API_BASE}/aktifTadilat`);
        return res.data;
      } catch (err) {
        console.error("Aktif tadilat çekilemedi:", err);
        return [];
      }
    
}
export const getAktifTadilatDetails = async (id) => {
    if (!id) return []; 
  
    try {
      const res = await axios.get(`${API_BASE}/aktifTadilat/${id}`);
      return res.data || [];
    } catch (err) {
      console.error("Aktif tadilat çekilemedi:", err);
      return [];
    }
  };
  
export const postAktifTadilat=async(item)=>{
    try {
        const res = await axios.post(`${API_BASE}/aktifTadilat`,item);
        return res.data;
      } catch (err) {
        console.error("Aktif tadilat çekilemedi:", err);
        return [];
      }
    
}
export const getKategoriler = async () => {
    try {
      const res = await axios.get(`${API_BASE}/kategori`);
      return res.data;
    } catch (err) {
      console.error("Kategoriler çekilemedi:", err);
      return [];
    }
  };

export const updateAccount = async (id, durum = false) => {
    try {
      const res = await axios.put(`${API_BASE}/hesap/${id}`, { hesap: durum });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Hesap durumu güncellenemedi:", err);
      return { success: false, error: err };
    }
  };
  
export const accountDelete = async (id) => {
    try {
        const res = axios.delete(
            `${API_BASE}/hesapSil/${id}`
        );
      return res.data
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };
export const SifremiUnuttum = async ( formData) => {
    try {
        const res =   axios.post(`${API_BASE}/sifremi-unuttum`, formData)
      return res.data
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };

export const updateHesap = async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE}/hesap/${id}`, formData, {
     headers: { "Content-Type": "application/json" },
      });
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Hesap güncellenemedi:", err);
      return { success: false, error: err };
    }
  };
  export const Login=async(formData)=>{
    try {
        const res = await axios.post(`${API_BASE}/login`, formData, {
       headers: { "Content-Type": "application/json" },
        });
        return { success: true, data: res.data };
      } catch (err) {
        console.error("Hesap güncellenemedi:", err);
        return { success: false, error: err };
      }
    };
    export const passwordSend = async (formData) => {
      try {
        const res = await axios.post(`${API_BASE}/sifre-gonder`, formData, {
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
    

  export const activeUpdated = async (id, formData) => {
    try {
        console.log(formData)
        const res = await axios.put(`${API_BASE}/aktifUpdated/${id}`, formData, {
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
      const res = await axios.get(`${API_BASE}/tadilat/${id}`);
      return res.data[0];
    } catch (err) {
      console.error("Tadilat verisi çekilemedi:", err);
      return null;
    }
  };
export const updateDurum = async (id, currentShowText) => {
  const newDurum = currentShowText ? "pasif" : "aktif";
  try {
    await axios.put(`${API_BASE}/aktifTadilat/durum/${id}`, {
      durum: newDurum,
    });
    getAktifTadilat();
    return { success: true, newDurum };

  } catch (error) {
    console.error("Durum güncellenemedi:", error);
    return { success: false };
  }
};
export const handleRegisterPost=async(formData)=>{
    try{
    const res=    await axios.post(`${API_BASE}/kayit`, formData);
        return res;
    }

       catch (err) {
        console.error("Aktif tadilat çekilemedi:", err);
        return [];
      }
    
}
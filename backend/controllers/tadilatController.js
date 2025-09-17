
import Tadilat from "../models/TadilatModel.js";
  //!güncelleme 
  export const updateTadilat = async (req, res) => {
    try {
      const { id } = req.params;
      const { durum } = req.body;
  
      const tadilat = await Tadilat.findById(id);
  
      if (!tadilat) {
        return res.status(404).json({ message: "Tadilat bulunamadı." });
      }
  

      if (durum === "iptal") {
        tadilat.durum = "iptal";
      }
  

      const bugun = new Date();
      const bitirme = new Date(tadilat.bitirmeTarihi);
      if (bitirme < bugun.setHours(0,0,0,0) && tadilat.durum !== "iptal") {
        tadilat.durum = "pasif";
      } else if (bitirme >= bugun.setHours(0,0,0,0) && tadilat.durum !== "iptal") {
        tadilat.durum = "aktif";
      }
  
      const kayit = await tadilat.save();
      res.status(200).json(kayit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Tadilat güncellenemedi." });
    }
  };
  
  
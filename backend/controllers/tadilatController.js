
import Tadilat from "../models/TadilatModel.js";

//! Post 
export const CreateTadilat = async (req, res) => {
    try {
      const { kategori, islem1, islem2, islem3, tarih, bitirmeTarihi } = req.body;
  
      if (!kategori || !islem1 || !islem2 || !islem3 || !bitirmeTarihi) {
        return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
      }
  
      // Otomatik durum belirleme
      const bugun = new Date();
      const bitirme = new Date(bitirmeTarihi);
      let durum = "aktif";
      if (bitirme < bugun.setHours(0,0,0,0)) {
        durum = "pasif";
      }
  
      const yeniTadilat = new Tadilat({
        kategori,
        islem1,
        islem2,
        islem3,
        tarih: tarih || new Date(),
        bitirmeTarihi,
        durum
      });
  
      const kayit = await yeniTadilat.save();
      res.status(201).json(kayit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Tadilat eklenirken bir hata oluştu." });
    }
  };
  
  // !LİST APİSİ
  export const listTadilat = async (req, res) => {
    try {
      const tadilatlar = await Tadilat.find().populate("kategori"); 
     
      res.status(200).json(tadilatlar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Tadilatlar alınamadı." });
    }
  };
//! GET APİSİ
  export const getTadilatById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const tadilat = await Tadilat.findById(id).populate("kategori");
  
      if (!tadilat) {
        return res.status(404).json({ message: "Tadilat bulunamadı." });
      }
  
      res.status(200).json(tadilat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Tadilat alınamadı." });
    }
  };
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
  
  
import Kategori from "../models/Kategori.js";

// !slider kategori
export const createKategori = async (req, res) => {
  try {
    const { isim, aciklama, resim } = req.body;

    if (!isim) {
      return res.status(400).json({ message: "Kategori ismi zorunludur!" });
    }

    const yeniKategori = new Kategori({
      isim,
      aciklama,
      resim
    });

    const kayit = await yeniKategori.save();
    res.status(201).json(kayit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kategori eklenirken hata oluştu." });
  }
};
export const getKategori=async(req,res)=>{

    try {
      const kategoriler = await Kategori.find(); 
     
      res.status(200).json(kategoriler);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "kategoriler alınamadı." });
    }
  
}

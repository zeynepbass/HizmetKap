
import Aktif from "../models/aktif.js";


export const aktifTadilat = async (req, res) => {
  try {
    const {
      primaryKey,
      anaBaslik,
      durum,
      veriler,
      telefonNo = null,
      konum = null
    } = req.body;


    if (!Array.isArray(veriler) || veriler.length === 0) {
      return res.status(400).json({ message: "Veriler array halinde olmalı ve boş olamaz." });
    }


    for (const [idx, v] of veriler.entries()) {
      if (
        typeof v.kategoriIsim !== "string" ||
        !Array.isArray(v.secenekler) ||
        typeof v.secilen !== "string"
      ) {
        return res.status(400).json({
          message: `Veri içeriği hatalı: index ${idx}`,
          cause: v
        });
      }
    }


    const result = await Aktif.findOneAndUpdate(
      { primaryKey },
      {
        primaryKey,
        anaBaslik,
        durum,
        veriler,
        telefonNo,
        konum
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("aktifTadilat HATA:", error);
    res.status(500).json({ message: "Eklenirken hata oluştu.", error: error.message });
  }
};


export const getAktif=async(req,res)=>{

    try {
      const aktif = await Aktif.find(); 
     
      res.status(200).json(aktif);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "aktifler alınamadı." });
    }
  
}
export const getAktifById = async (req, res) => {
  try {
    const { primaryKey } = req.params;

    const aktif = await Aktif.findOne({ primaryKey });

    if (!aktif) {
      return res.status(404).json({ message: "Aktif bulunamadı." });
    }

    res.status(200).json(aktif);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Aktif alınamadı." });
  }
};



export const updateAktif = async (req, res) => {
  try {
    const { primaryKey } = req.params; 
    const {telefonNo, konum } = req.body;

    if (!primaryKey) {
      return res.status(400).json({ message: "ID eksik." });
    }

    const aktif = await Aktif.findOne({primaryKey});


    if (!aktif) {
      return res.status(404).json({ message: "aktif bulunamadı." });
    }

    if (telefonNo) aktif.telefonNo = telefonNo;
    if (konum) aktif.konum = konum;


    const kayit = await aktif.save();
    res.status(200).json(kayit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "aktifler güncellenemedi." });
  }
};

export const updateDurum = async (req, res) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID eksik." });
    }

    if (!["aktif", "pasif", "iptal"].includes(durum)) {
      return res.status(400).json({ message: "Geçersiz durum değeri. Sadece 'aktif', 'pasif' veya 'iptal' olabilir." });
    }

    const aktif = await Aktif.findById(id);
    if (!aktif) {
      return res.status(404).json({ message: "Kayıt bulunamadı." });
    }

    aktif.durum = durum;

    const kayit = await aktif.save();
    res.status(200).json(kayit);

  } catch (error) {
    console.error("Durum güncellenemedi:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};



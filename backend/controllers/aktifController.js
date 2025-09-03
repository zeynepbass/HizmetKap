import Aktif from "../models/aktif.js";
export const aktifTadilat = async (req, res) => {
  try {
    const { anaBaslik, secilen, durum,kategoriIsim } = req.body;

    const yeniKategori = new Aktif({
        anaBaslik, secilen, durum,kategoriIsim
    });

    const kayit = await yeniKategori.save();
    res.status(201).json(kayit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "eklenirken hata oluştu." });
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
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Geçersiz id" });
    }


    const aktif = await Aktif.findById(id).populate("aktif");

    if (!aktif) {
      return res.status(404).json({ message: "aktif bulunamadı." });
    }

    res.status(200).json(aktif);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "aktif alınamadı." });
  }
};
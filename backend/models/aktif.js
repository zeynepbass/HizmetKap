import mongoose from "mongoose";

const veriSchema = new mongoose.Schema({
    kategoriIsim: { type: String, required: true },
    secenekler: [{ type: String, required: true }],
    secilen: { type: String, required: true }
  });
  
  const aktifSchema = new mongoose.Schema({
    primaryKey: { type: String, unique: true, required: true },
    anaBaslik: { type: String, required: true },
    durum: { type: String, enum: ["aktif", "pasif", "iptal"], default: "aktif" },
    veriler: { type: [veriSchema], required: true },
    telefonNo: { type: String, default: null },
    konum: { type: String, default: null }
  });
  

const Aktif = mongoose.model("Aktif", aktifSchema);

export default Aktif;



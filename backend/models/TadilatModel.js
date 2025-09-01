


import mongoose from "mongoose";

const tadilatSchema = new mongoose.Schema({
  kategori: { type: mongoose.Schema.Types.ObjectId, ref: "Kategori", required: true },
  islem1: { type: String, required: true },
  islem2: { type: String, required: true },
  islem3: { type: String, required: true },
  tarih: { type: Date, default: Date.now },
  bitirmeTarihi: { type: Date},
  durum: { type: String, enum: ["aktif", "pasif", "iptal"], default: "aktif" } // opsiyonel durum alanı
});

const Tadilat = mongoose.model("Tadilat", tadilatSchema);

export default Tadilat;

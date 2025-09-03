import mongoose from "mongoose";

const aktifSchema = new mongoose.Schema({
    anaBaslik: { type: String},
    secilen: { type: String},
    durum: { type: String },
    kategoriIsim: { type: String}
});

const Aktif = mongoose.model("Aktif", aktifSchema);

export default Aktif; 

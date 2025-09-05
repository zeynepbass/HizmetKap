import express from "express";
import * as category from "../controllers/categoryController.js";
import * as tadilat from "../controllers/tadilatController.js";
import * as aktif from "../controllers/aktifController.js";
const router = express.Router();

// !kategoriroutes
router.post("/kategori", category.createKategori);
router.get("/kategori", category.getKategori);
// !aktifroutes
router.post("/aktifTadilat", aktif.aktifTadilat);
router.put("/aktifUpdated/:primaryKey", aktif.updateAktif);
router.get("/aktifTadilat/:primaryKey", aktif.getAktifById);
router.put("/aktifTadilat/durum/:id", aktif.updateDurum);
router.get("/aktifTadilat", aktif.getAktif);
// !tadilatroutes
router.get("/tadilat", tadilat.listTadilat);
router.post("/tadilat", tadilat.createTadilat);
router.get("/tadilat/:kategoriId", tadilat.getTadilatById);
router.put("/tadilat/:id", tadilat.updateTadilat);

export default router;

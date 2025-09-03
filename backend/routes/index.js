import express from "express";
import * as category from "../controllers/categoryController.js";
import * as tadilat from "../controllers/tadilatController.js";
import * as aktif from "../controllers/aktifController.js";
const router = express.Router();


router.post("/kategori", category.createKategori);
router.get("/kategori", category.getKategori);
router.get("/tadilat", tadilat.listTadilat);
router.post("/tadilat", tadilat.createTadilat);
router.post("/aktifTadilat", aktif.aktifTadilat);
router.get("/aktifTadilat/:id", aktif.getAktifById);
router.get("/aktifTadilat", aktif.getAktif);
router.get("/tadilat/:kategoriId", tadilat.getTadilatById);
router.put("/tadilat/:id", tadilat.updateTadilat);

export default router;

import express from "express";
import * as category from "../controllers/categoryController.js";
import * as tadilat from "../controllers/tadilatController.js";

const router = express.Router();

// Category
router.post("/kategori", category.createKategori);

// Tadilat
router.get("/tadilat", tadilat.listTadilat);
router.post("/tadilat", tadilat.CreateTadilat);
router.get("/tadilat/:id", tadilat.getTadilatById);
router.put("/tadilat/:id", tadilat.updateTadilat); // Güncelleme API'si

export default router;

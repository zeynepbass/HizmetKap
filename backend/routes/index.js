import express from "express";
import * as category from "../controllers/categoryController.js";
import * as tadilat from "../controllers/tadilatController.js";
import * as aktif from "../controllers/aktifController.js";
import * as kayit from "../controllers/kullaniciController.js";
import * as message from "../controllers/messageController.js";
const router = express.Router();

// !kategoriroutes
router.post("/kategori", category.createKategori);
router.get("/kategori", category.getKategori);
// !aktifroutes
router.post("/aktifTadilat", aktif.createAktif);
router.put("/aktifUpdated/:primaryKey", aktif.updateAktif);
router.get("/aktifTadilat/:primaryKey", aktif.getAktifById);
router.put("/aktifTadilat/durum/:id", aktif.updateDurum);
router.get("/aktifTadilat", aktif.getAktif);
// !tadilatroutes
router.get("/tadilat", tadilat.listTadilat);
router.post("/tadilat", tadilat.createTadilat);
router.get("/tadilat/:kategoriId", tadilat.getTadilatById);
router.put("/tadilat/:id", tadilat.updateTadilat);

// !kullanıcı
router.get("/kullanicilar", kayit.kullanicilariListele);
router.get("/kullanici/:id", kayit.kullaniciDetay);

router.post("/login", kayit.login);
router.post("/kayit", kayit.kayitOl);
router.post("/sifre-gonder", kayit.smsGonder);
router.post("/sifremi-unuttum", kayit.sifreGuncelle);
router.put("/hesap/:id", kayit.kullaniciGuncelle);
router.delete("/hesapSil/:id", kayit.kullaniciSil);

//! message
router.get('/mesajlar/:gonderenId/:aliciId',message.getMessage);
router.post('/mesajlar',message.postMessage);
router.get('/konusmalar/:userId', message.getConversations); 

router.delete('/:gonderenId/:aliciId',message.deleteMessagesBetweenUsers);

export default router;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getTadilatById,
  postAktifTadilat,
  updateDurum,
} from "@/shared/services/api";

import { TalepForm } from "../components/TalepForm";
import { TalepSuccess } from "../components/TalepSuccess";
import { TalepExitModal } from "../components/TalepExitModal";

export default function Talep({ id }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [dialog, setOpenDialog] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [showTalepExitModal, setShowTalepExitModal] = useState(false);

  const [steps, setSteps] = useState(null);
  const [item, setItem] = useState("");
  const [stored, setKullanici] = useState(null);
  const [storedData, setStoredItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTadilatById(id);

        if (res) {
          setSteps(res[0].adimlar);
          setItem(res[0].kategori);
        }
      } catch (err) {
        console.error("Tadilat verisi alınamadı:", err);
      }
    };

    fetchData();

    const kullanici = JSON.parse(
      localStorage.getItem("kullanici")
    );

    const storedItem = localStorage.getItem("item");

    setKullanici(kullanici);
    setStoredItem(storedItem);
  }, [id]);

  if (!steps) {
    return (
      <p className="text-center font-bold text-gray-600">
        Yükleniyor...
      </p>
    );
  }

  const progressPercent =
    ((currentStep + 1) / steps.length) * 100;

  const handleAnswer = (option) => {
    setAnswers((prev) => {
      const updated = [...prev];

      updated[currentStep] = {
        kategoriIsim: steps[currentStep].baslik,
        secenekler: steps[currentStep].secenekler,
        secilen: option,
      };

      return updated;
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const dataToSend = {
      primaryKey: id,
      anaBaslik: item.isim,
      durum: "aktif",
      ad: stored.ad,
      soyad: stored.soyad,
      email: stored.email,
      kullaniciId: stored.id,

      veriler: answers.map((ans) => ({
        kategoriIsim: ans.kategoriIsim,
        secenekler: ans.secenekler,
        secilen: ans.secilen,
      })),

      telefonNo: stored.telefonNo || null,
      konum: stored.konum || null,
    };

    try {
      const response = await postAktifTadilat(dataToSend);

      localStorage.setItem("item", response.primaryKey);
      localStorage.setItem("itemDurum", response._id);

      setOpen(true);
    } catch (err) {
      console.error("Post işlemi başarısız:", err);
    }
  };

  const handleClick = async () => {
    const durumId = localStorage.getItem("itemDurum");

    const result = await updateDurum(
      durumId,
      null,
      true
    );

    if (result.success) {
      setOpenDialog(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDialog(false);
    router.push("/ana-sayfa");
  };

  const handleExit = () => {
    setShowTalepExitModal(false);
    router.push("/ana-sayfa");
  };

  return (
    <div className="w-full justify-center">

      {open ? (
        <TalepSuccess
          dialog={dialog}
          handleClose={handleClose}
          handleClick={handleClick}
          storedData={storedData}
        />
      ) : (
        <TalepForm
          item={item}
          steps={steps}
          currentStep={currentStep}
          answers={answers}
          progressPercent={progressPercent}
          handleAnswer={handleAnswer}
          handleNext={handleNext}
          handleBack={handleBack}
          setShowTalepExitModal={setShowTalepExitModal}
        />
      )}

      <TalepExitModal
        open={showTalepExitModal}
        onClose={() => setShowTalepExitModal(false)}
        onExit={handleExit}
      />

    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTadilatById,
  postAktifTadilat,
  updateDurum,
} from "../../../app/services/api";
import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
export default function Page() {
  const params = useParams();
  const { id } = params;
  const storedData = localStorage.getItem("item");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialog, setOpenDialog] = useState(false);
  const stored = JSON.parse(localStorage.getItem("kullanici"));
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [steps, setSteps] = useState(null);
  const [item, setItem] = useState("");
  useEffect(() => {
    if (id) {
      getTadilatById(id).then((data) => {
        if (data) {
          setSteps(data.adimlar);
          setItem(data);
        }
      });
    }
  }, [id]);

  if (!steps)
    return <p className="text-center font-bold text-gray-600">Yükleniyor...</p>;

  const progressPercent = ((currentStep + 1) / steps.length) * 100;
  const PostData = async (item) => {
    try {
      const response = await postAktifTadilat(item);
      localStorage.setItem("item", response.primaryKey);
      localStorage.setItem("itemDurum", response._id);
    } catch (err) {
      console.error("Post işlemi başarısız:", err);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const dataToSend = {
        primaryKey: id,
        anaBaslik: item.kategori.isim,
        durum: "aktif",
        ad: stored.kullanici.ad,
        soyad: stored.kullanici.soyad,
        email: stored.kullanici.email,
        kullaniciId: stored.kullanici.id,
        veriler: answers.map((ans) => ({
          kategoriIsim: ans.kategoriIsim,
          secenekler: ans.secenekler,
          secilen: ans.secilen,
        })),
        telefonNo: stored.kullanici.telefonNo || null,
        konum: stored.kullanici.konum || null,
      };

      PostData(dataToSend);
      setOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

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

  const handleClick = async () => {
    const durumId = localStorage.getItem("itemDurum");
    const result = await updateDurum(durumId, null, true);

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
  return (
    <div className="w-full justify-center ">
      {open ? (
        <div className="w-full justify-center mt-10 p-6 bg-white rounded shadow">
          <Snackbar
            open={dialog}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Başarıyla talep alındı!
            </Alert>
          </Snackbar>

          <p className="font-bold text-gray-600  text-left p-4 cursor-pointer">
            Talebini Aldık
          </p>
          <p className=" text-gray-300 text-left pl-3">
            İstek aldığında e-postana bildirim gelicek.
          </p>

          <Link
            href={`/hizmet/${storedData}`}
            className="font-bold hover:underline text-gray-600 p-4 underline"
          >
            Detaylara bak
          </Link>

          <img src="/2769497.png" width="45%" height="30%" className="m-auto" />
          <div className="flex justify-center gap-1 p-5">
            <button
              className=" p-3 text-[rgb(237,203,206)] rounded-md cursor-pointer"
              onClick={handleClick}
            >
              Talebi iptal et
            </button>
            <button
              className=" rounded-4xl  pl-4 pr-4 cursor-pointer  bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
              onClick={() => router.push("/ana-sayfa")}
            >
              İşlerime git
            </button>
          </div>
        </div>
      ) : (
<div className="w-[90%] md:w-[70%] min-h-[80vh] mx-auto mt-16 md:mt-24">


          <h2 className="text-xl font-semibold text-center mb-4 text-gray-500">
            {item.kategori.isim}
          </h2>

          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div
              className="bg-[rgb(237,203,206)]  h-2.5 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <h3 className="text-lg font-medium mb-2 text-gray-400">
            {steps[currentStep].baslik}
          </h3>

          <div className="space-y-2">
            {steps[currentStep].secenekler.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer text-gray-600"
              >
                <input
                  type="radio"
                  name={`step-${currentStep}`}
                  className="form-radio text-gra-600"
                  checked={answers[currentStep]?.secilen === option}
                  onChange={() => handleAnswer(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setShowExitModal(true)}
              className="bg-[rgb(255,176,73)] text-[rgb(242,247,250)] px-4 py-2 rounded  hover:opacity-85"
            >
              Çık
            </button>

            <div className="space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="border text-gray-400 border-gray-200 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Geri
                </button>
              )}
              <button
                onClick={handleNext}
                className="bg-[rgb(78,36,77)] text-[rgb(242,247,250)] px-4 py-2 rounded hover:bg-[rgb(78,36,77)] hover:opacity-85"
                disabled={!answers[currentStep]}
              >
                Devam
              </button>
            </div>
          </div>
        </div>
      )}

      {showExitModal && (
        <div className="fixed inset-0 bg-[rgb(242,247,250)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-600">
              Emin misin?
            </h2>
            <p className="text-sm text-[rgb(242,247,250) mb-4">
              Birkaç soruya daha cevap vererek ücretsiz teklif alabilirsin.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowExitModal(false);
                  router.push("/ana-sayfa");
                }}
                className="w-full bg-[rgb(255,176,73)] rounded-4xl text-[rgb(242,247,250)] py-2  hover:bg-[rgb(255,176,73)] hover:opacity-85"
              >
                Çık
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full  mx-auto p-3 cursor-pointer rounded-md border border-gray-100 text-gray-600 hover:text-[rgb(242,247,250)] transition-colors duration-300 mt-2"
              >
                Devam et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

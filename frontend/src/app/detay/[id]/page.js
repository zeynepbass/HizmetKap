"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {Snackbar, Alert } from '@mui/material';
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
      axios
        .get(`http://localhost:5233/tadilat/${id}`)
        .then((res) => {
          const data = res.data[0];
          setSteps(data.adimlar);
          setItem(data);
        })
        .catch((err) => console.error("Veri çekilemedi:", err));
    }
  }, [id]);

  if (!steps) return <p className="text-center font-bold">Yükleniyor...</p>;

  const progressPercent = ((currentStep + 1) / steps.length) * 100;
  const PostData = async (item) => {
    try {
      const response = await axios.post("http://localhost:5233/aktifTadilat", item);
      localStorage.setItem("item", response.data.primaryKey);
      localStorage.setItem("itemDurum", response.data._id);
    } catch (err) {
      console.error("Post işlemi başarısız:", err);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Son adıma gelindi, POST işlemi yap
      const dataToSend = {
        primaryKey: id,
        anaBaslik: item.kategori.isim,
        durum: "aktif",
        ad: stored.kullanici.ad,
        soyad: stored.kullanici.soyad,
        email: stored.kullanici.email,
        kullaniciId: stored.kullanici.id,
        veriler: answers.map(ans => ({
          kategoriIsim: ans.kategoriIsim,
          secenekler: ans.secenekler,
          secilen: ans.secilen
        })),
        telefonNo: stored.kullanici.telefonNo || null,
        konum: stored.kullanici.konum || null
      };
  
      PostData(dataToSend); // API'ye gönder
      setOpen(true);         // Onay modalını aç
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
        secilen: option
      };
      return updated;
    });
  };
  
  const handleClick = async () => {
    const durumId = localStorage.getItem("itemDurum")
    const newDurum = "iptal"

    await axios.put(`http://localhost:5233/aktifTadilat/durum/${durumId}`, {
      durum: newDurum,
    });
    setOpenDialog(true);


  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDialog(false);
    router.push("/ana-sayfa");
  };
  return (
    <div className="w-full justify-center">

      {open ?
        <div className="w-full justify-center mt-10 p-6 bg-white rounded shadow">
          <Snackbar
            open={dialog}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Başarıyla talep alındı!
            </Alert>
          </Snackbar>

          <p className='font-bold text-black text-left p-4 cursor-pointer' >Talebini Aldık</p>
          <p className=' text-gray-300 text-left pl-3'>İstek aldığında e-postana bildirim gelicek.</p>

          <Link href={`/hizmet/${storedData}`} className="font-bold hover:underline p-4 underline">
            Detaylara bak
          </Link>



          <img src="/siparis.jpg" width="30%" height="30%" className='m-auto' />
          <div className='flex justify-center gap-1 p-5'>

            <button className=' p-3 text-red-600 rounded-md cursor-pointer' onClick={handleClick}>Talebi iptal et</button>
            <button className='bg-amber-500 pl-4 pr-4 rounded-md text-white cursor-pointer' onClick={() => router.push("/ana-sayfa")}>İşlerime git</button>
          </div>
        </div>
        :
        <div className="w-1/2 mx-auto border-2 border-gray-100 p-3 rounded-lg">

          <h2 className="text-xl font-semibold text-center mb-4">
            {item.kategori.isim}
          </h2>



          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>


          <h3 className="text-lg font-medium mb-2">
            {steps[currentStep].baslik}
          </h3>


          <div className="space-y-2">
            {steps[currentStep].secenekler.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`step-${currentStep}`}
                  className="form-radio text-green-600"
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
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Çık
            </button>

            <div className="space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Geri
                </button>
              )}
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={!answers[currentStep]}
              >
                Devam
              </button>
            </div>
          </div>   </div>
      }


      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Emin misin?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Birkaç soruya daha cevap vererek ücretsiz teklif alabilirsin.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100"
              >
                Devam et
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  router.push("/ana-sayfa");
                }}
                className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
              >
                Çık
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

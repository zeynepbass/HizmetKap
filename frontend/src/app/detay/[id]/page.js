"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem("item", JSON.stringify(answers));
      router.push("/ana-sayfa");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };
  const PostData = async (item) => {
    try {
      await axios.post("http://localhost:5233/aktifTadilat", item);
    } catch (err) {
      console.error("Post işlemi başarısız:", err);
    }
  }; 

  const handleAnswer = (option) => {

   const anaBaslik=item.kategori.isim
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentStep] = {
        anaBaslik:anaBaslik,
        kategoriIsim: steps[currentStep].baslik,
        secenekler: steps[currentStep].secenekler,
        secilen: option
   
      };
  

      localStorage.setItem("item", JSON.stringify(updated));
      PostData(updated)
      return updated;
    });
  };
  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
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
      </div>


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

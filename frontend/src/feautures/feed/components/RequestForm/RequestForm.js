"use client";

import { Button } from "@/shared/components/atoms";

export function RequestForm({
  item,
  steps,
  currentStep,
  answers,
  progressPercent,
  handleAnswer,
  handleNext,
  handleBack,
  setShowExitModal,
}) {
  const currentQuestion = steps[currentStep];

  return (
    <div className="w-[90%] md:w-[70%] min-h-[80vh] mx-auto mt-16 md:mt-24">

      <h2 className="text-xl font-semibold text-center mb-4 text-gray-500">
        {item.isim}
      </h2>

      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
        <div
          className="bg-[rgb(237,203,206)] h-2.5 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <h3 className="text-lg font-medium mb-2 text-gray-400">
        {currentQuestion.baslik}
      </h3>

      <div className="space-y-2">
        {currentQuestion.secenekler.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer text-gray-600"
          >
            <input
              type="radio"
              name={`step-${currentStep}`}
              checked={answers[currentStep]?.secilen === option}
              onChange={() => handleAnswer(option)}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-between">

        <Button
          type="button"
          onClick={() => setShowExitModal(true)}
          className="bg-[rgb(255,176,73)] text-[rgb(242,247,250)] px-4 py-2 rounded hover:opacity-85"
        >
          Çık
        </Button>

        <div className="space-x-2">

          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              className="border text-gray-400 border-gray-200 px-4 py-2 rounded hover:bg-gray-100"
            >
              Geri
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!answers[currentStep]}
            className="border text-gray-400 border-gray-200 px-4 py-2 rounded hover:bg-gray-100"
          >
            Devam
          </Button>

        </div>
      </div>
    </div>
  );
}
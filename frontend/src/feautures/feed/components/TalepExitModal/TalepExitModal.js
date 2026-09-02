"use client";

import { Button } from "@/shared/components/atoms";

export function TalepExitModal({
  open,
  onClose,
  onExit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(242,247,250)] bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">

        <h2 className="text-lg font-semibold mb-2 text-gray-600">
          Emin misin?
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          Birkaç soruya daha cevap vererek ücretsiz teklif alabilirsin.
        </p>

        <div className="space-y-2">

          <Button
            onClick={onExit}
            className="w-full bg-[rgb(255,176,73)] rounded-4xl text-[rgb(242,247,250)] py-2 hover:opacity-85"
          >
            Çık
          </Button>

          <Button
            onClick={onClose}
            className="w-full mx-auto p-3 cursor-pointer rounded-md border border-gray-100 text-gray-600 hover:text-[rgb(242,247,250)] transition-colors duration-300 mt-2"
          >
            Devam et
          </Button>

        </div>
      </div>
    </div>
  );
}
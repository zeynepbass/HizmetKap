"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThreePerViewCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const router = useRouter();

  const maxIndex = slides.length - itemsPerView;

  const prev = () => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  };
  const userControl = localStorage.getItem("kullaniciAdi")
  return (
    <div className="relative p-5 w-[80%] mx-auto">

        <div className={`${userControl ? "opacity-50 pointer-events-none" : ""}`}>
          <h6 className="font-bold pb-3">Trend Hizmetler</h6>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(current * 100) / itemsPerView}%)`,
                width: `${(slides.length * 100) / itemsPerView}%`,
              }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={slide._id ?? idx}
                  onClick={() => router.push(`/detay/${slide._id}`)}
                  className="px-2 cursor-pointer"
                  style={{ flex: `0 0 ${100 / slides.length}%` }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={slide.resim}
                      alt={slide.isim}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-center">
                        {slide.isim}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute right-20 top-5 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white z-10"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute right-10 top-5 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white z-10"
          >
            ▶
          </button>
        </div>

    </div>

  );
}

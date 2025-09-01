"use client"
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation"
export default function ThreePerViewCarousel({ slidesProp }) {
    const defaultSlides = [
        { id: 1, image: "/images-slider/slide1.jpg", title: "Evden eve nakliyat" },
        { id: 2, image: "/images-slider/slide2.jpg", title: "Boyacı" },
        { id: 3, image: "/images-slider/slide3.jpg", title: "Ev Temizliği" },
        { id: 4, image: "/images-slider/slide4.jpg", title: "Duvar Dekorasyonu" },
        { id: 5, image: "/images-slider/slide5.jpg", title: "Ev tadilatı" },
        { id: 6, image: "/images-slider/slide6.jpg", title: "Fayans Döşeme" },
    ];

    const slides = slidesProp && slidesProp.length ? slidesProp : defaultSlides;

    const [current, setCurrent] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            let per = 3;
            if (w < 640) per = 1;
            else if (w < 1024) per = 2;
            else per = 3;
            setItemsPerView(Math.min(per, slides.length));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [slides.length]);

    const maxIndex = Math.max(slides.length - itemsPerView, 0);

    const prev = () => {
        setCurrent((c) => (c === 0 ? maxIndex : c - 1));
    };

    const next = () => {
        setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    };
const router=useRouter();
    return (
        <div className="relative p-5 w-[80%] mx-auto">
            <h6 className="font-bold pb-3">Trend Hizmetler</h6>
            <div className="overflow-hidden">

                <div
                    className="flex transition-transform duration-500 ease-in-out "
                    style={{
                        transform: `translateX(-${(current * 100) / itemsPerView}%)`,
                    }}
                >
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id ?? idx}
                             onClick={()=>router.push(`/detay/${slide.id}`)}
                            style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                            className="px-2"
                        >
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-sm font-semibold text-center">{slide.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <button
                onClick={prev}
                aria-label="Önceki"
                className="absolute right-15 top-6 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
            >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M12 15L7 10l5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>


            <button
                onClick={next}
                aria-label="Sonraki"
                className="absolute right-2 top-6 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white"
            >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path d="M8 5l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}

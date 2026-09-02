"use client";
import { useState, useEffect } from "react";
import {AnasayfaCarousel} from "@/components/AnasayfaCarousel";
import {getKategoriler} from "@/shared/services/api"
export function AnasayfaSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKategoriler();
      setSlides(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      {slides.length > 0 && <AnasayfaCarousel slides={slides} />}
    </main>
  );
}

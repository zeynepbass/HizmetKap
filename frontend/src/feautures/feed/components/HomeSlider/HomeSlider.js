"use client";
import { useState, useEffect } from "react";
import {HomeCarousel} from "@/components/HomeCarousel";
import {getKategoriler} from "@/shared/services/api"
export function HomeSlider() {
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
      {slides.length > 0 && <HomeCarousel slides={slides} />}
    </main>
  );
}

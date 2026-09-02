"use client";
import { useState, useEffect } from "react";
import ThreePerViewCarousel from "@/components/ThreePerViewCarousel";
import {getKategoriler} from "@/../app/services/api"
export default function xPage() {
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
      {slides.length > 0 && <ThreePerViewCarousel slides={slides} />}
    </main>
  );
}

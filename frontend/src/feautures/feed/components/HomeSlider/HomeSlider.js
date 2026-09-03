"use client";
import { useState, useEffect } from "react";
import {HomeCarousel} from "../HomeCarousel";
import {getCategories} from "@/features/feed/api"
export function HomeSlider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
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

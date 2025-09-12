"use client";
import { useState, useEffect } from "react";
import ThreePerViewCarousel from "../../components/ThreePerViewCarousel";

export default function Page() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5233/kategori")
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
      {slides.length > 0 && <ThreePerViewCarousel slides={slides} />}
    </main>
  );
}

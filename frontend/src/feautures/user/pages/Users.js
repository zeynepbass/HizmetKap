"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, getActiveRenovations } from "@/features/feed/api"
import {Heading } from "@/shared/components/atoms";
import { KullaniciCard } from "../components/KullaniciCard";
export {toSlugUrl} from "@/shared/helpers/toSlug"
export default function Kullanicilar(isim) {

  const [data, setData] = useState([]);
  const router = useRouter();
  const [kullaniciStored, setKullaniciStored] = useState(null);
  const [storedKullaniciAdi, setStoredKullaniciAdi] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setData(users);
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      }
    };

    fetchData();

    const kullanici = JSON.parse(localStorage.getItem("kullanici"));
    const kullaniciAdi = localStorage.getItem("kullaniciAdi");

    setKullaniciStored(kullanici);
    setStoredKullaniciAdi(kullaniciAdi);
  }, []);

  const fetchTadilat = async () => {
    try {
      const response = await getActiveRenovations();
      setCategory(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTadilat();
  }, []);

  const toDisplay = (text) => {
    if (!text) return "";
    return text
      .replace(/-/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };



  const filteredTadilat = category.filter(
    (item) =>
      toSlugUrl(item?.anaBaslik) === isim &&
      item?.durum === "aktif" &&
      (storedKullaniciAdi || item?.email !== kullaniciStored?.kullanici?.email)
  );

  return (
    <div className="p-6">
<Heading
  title={`Kategori: ${toDisplay(filteredTadilat[0]?.anaBaslik || isim)}`}
/>
      <div className="relative w-full mx-auto">
      {filteredTadilat.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
    {filteredTadilat.reverse().map((slide) => (
      <KullaniciCard
        key={slide._id}
        slide={slide}
        onMessage={() =>
          router.push(`/mesaj-kutusu/${slide.kullaniciId}`)
        }
      />
    ))}
  </div>
) : (
  <p className="text-center text-gray-400 mt-16 text-lg font-medium">
    Bu kategoriye ait tadilat bulunamadı.
  </p>
)}
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/shared/components/atoms";
import { KullaniciCard } from "../components/KullaniciCard";
import { toDisplay } from "../helpers/toDisplay";
import { filterTadilat } from "../utils/filter";
import { useTadilat } from "../hooks/useUser";

export default function Users({ isim }) {
  const router = useRouter();

  const [kullaniciStored, setKullaniciStored] = useState(null);
  const [storedKullaniciAdi, setStoredKullaniciAdi] = useState(null);

  const {
    users,
    tadilat,
    isLoading,
  } = useTadilat();

  useEffect(() => {
    const kullanici = JSON.parse(
      localStorage.getItem("kullanici")
    );

    const kullaniciAdi =
      localStorage.getItem("kullaniciAdi");

    setKullaniciStored(kullanici);
    setStoredKullaniciAdi(kullaniciAdi);
  }, []);

  const filteredTadilat = filterTadilat(
    tadilat,
    isim,
    storedKullaniciAdi,
    kullaniciStored
  );

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="p-6">
      <Heading
        title={`Kategori: ${toDisplay(
          filteredTadilat[0]?.anaBaslik || isim
        )}`}
      />

      <div className="relative w-full mx-auto">
        {filteredTadilat.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[...filteredTadilat].reverse().map((slide) => (
              <KullaniciCard
                key={slide._id}
                slide={slide}
                onMessage={() =>
                  router.push(
                    `/mesaj-kutusu/${slide.kullaniciId}`
                  )
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


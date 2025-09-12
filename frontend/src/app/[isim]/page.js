"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function KategoriPage() {
  const params = useParams();
  const { isim } = params;
  const router = useRouter();
  const [kullaniciStored, setKullaniciStored] = useState(null);
  const [storedKullaniciAdi, setStoredKullaniciAdi] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {

    const kullanici = JSON.parse(localStorage.getItem("kullanici"));
    const kullaniciAdi = JSON.parse(localStorage.getItem("kullaniciAdi"));

    setKullaniciStored(kullanici);
    setStoredKullaniciAdi(kullaniciAdi);
  }, []);
  const fetchTadilat = async () => {
    try {
      const response = await axios.get("http://localhost:5233/aktifTadilat");
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTadilat();
  }, []);

  const toSlug = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const filteredTadilat = category.filter((item) => 
    toSlug(item?.anaBaslik) === isim &&
    item?.durum === "aktif" &&
    (storedKullaniciAdi || item?.email !== kullaniciStored?.kullanici.email)
  );
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-8 border-b-2 border-gray-200 pb-3">
        Kategori: {filteredTadilat[0]?.anaBaslik || isim}
      </h1>

      <div className="relative w-full mx-auto">
        {filteredTadilat.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTadilat.map((slide) => (
              <div
                key={slide._id}

                className="cursor-pointer group transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">


                  <div className="p-5 border-b border-gray-100">
                    <p className="text-md text-gray-600 mb-2">
                      <span className="font-semibold">Yayınlayan:</span> {slide.ad}
                      {slide.telefonNo && ` | ${slide.telefonNo}`}
                      {slide.konum && ` | ${slide.konum}`}
                    </p>
                  </div>


                  <div className="p-4">


                    <p className="text-sm text-gray-500 mb-2 text-center">
                      <span className="font-semibold">Kategoriler:</span> {slide.kategoriIsim}
                    </p>

                    <p className="text-sm text-gray-400 text-center mb-4">
                      <span className="font-semibold">İlan tarihi:</span>{" "}
                      {slide.baslangicTarihi && slide.bitisTarihi
                        ? `${new Date(slide.baslangicTarihi).toLocaleDateString("tr-TR")} - ${new Date(slide.bitisTarihi).toLocaleDateString("tr-TR")}`
                        : "Süresiz"}
                    </p>


                    <div className="space-y-2">
                      {slide.veriler.map((veri, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
                        >
                          <span className="font-semibold">{veri.kategoriIsim}:</span>{" "}
                          <span>Seçenekler: {veri.secenekler.join(", ")}</span>{" "}
                          <span>Seçilen: {veri.secilen}</span>
                        </div>
                      ))}
                    </div>

                    {storedKullaniciAdi ? null : <div className="flex justify-center mt-5">
                      <button
                        onClick={() => router.push(`/mesaj-kutusu/${slide.kullaniciId}`)}
                        type="button"
                        className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
                      >
                        Mesaj At
                      </button>
                    </div>}

                  </div>

                </div>
              </div>
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

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUsersGet, getAktifTadilat } from "@/app/services/api";
import Konum from "@/features/feed/pages/Konum"
const page=()=>{
  const params = useParams();
  const { isim } = params;
  const [data, setData] = useState([]);
  const router = useRouter();
  const [kullaniciStored, setKullaniciStored] = useState(null);
  const [storedKullaniciAdi, setStoredKullaniciAdi] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsersGet();
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
      const response = await getAktifTadilat();
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

  const toSlugUrl = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  const filteredTadilat = category.filter(
    (item) =>
      toSlugUrl(item?.anaBaslik) === isim &&
      item?.durum === "aktif" &&
      (storedKullaniciAdi || item?.email !== kullaniciStored?.kullanici?.email)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-gray-500 mb-8  pb-3">
        Kategori: {toDisplay(filteredTadilat[0]?.anaBaslik || isim)}
      </h1>

      <div className="relative w-full mx-auto">
        {filteredTadilat.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredTadilat.reverse().map((slide) => {
              const user = data.find((u) => u.email === slide.email);

              return (
                <div key={slide._id}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <p className="text-md text-gray-400 mb-2">
                        <span className="font-semibold">Yayınlayan: {slide.ad.toUpperCase()}</span>{" "}<br/>
                        <span className="font-semibold">Telefon No:  {slide.telefonNo}</span>{" "}<br/>
                        <span className="font-semibold">Email:  {slide.email}</span>{" "}<br/>
                        <span className="font-semibold">Konum: <Konum konum={slide.konum} /></span>{" "}
   
                      </p>

                     
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2 text-center">
                        <span className="font-semibold">Kategoriler:</span>{" "}
                        {slide.kategoriIsim}
                      </p>

                      <p className="text-sm text-gray-500 text-center mb-4">
                        <span className="font-semibold">İlan tarihi:</span>{" "}
                        {slide.baslangicTarihi && slide.bitisTarihi
                          ? `${new Date(
                              slide.baslangicTarihi
                            ).toLocaleDateString("tr-TR")} - ${new Date(
                              slide.bitisTarihi
                            ).toLocaleDateString("tr-TR")}`
                          : "Süresiz"}
                      </p>

                      <div className="space-y-2">
                        {slide.veriler.map((veri, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
                          >
                            <span className="font-semibold">
                              {veri.kategoriIsim}:
                            </span>{" "}
                            <span>
                              Seçenekler: {veri.secenekler.join(", ")}
                            </span>{" "}
                            <span>Seçilen: {veri.secilen}</span>
                          </div>
                        ))}
                      </div>

                      {!storedKullaniciAdi && (
                        <div className="flex justify-center mt-5">
                          <button
                            onClick={() =>
                              router.push(`/mesaj-kutusu/${slide.kullaniciId}`)
                            }
                            type="button"
                            className="w-[50%] rounded-4xl  mx-auto p-3 cursor-pointer  bg-[rgb(255,127,60)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(78,36,77)] transition-colors duration-300 mt-2"
                          >
                            Mesaj At
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
export default page
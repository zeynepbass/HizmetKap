"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Slider from "../../components/Slider";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const Home = () => {
  const router = useRouter();

  const [itemsAktif, setItemsAktif] = useState([]);
  const [showText, setShowText] = useState({});
  const [openIndex, setOpenIndex] = useState(0);

  const tabs = [
    {
      title: "Aktif işlerim",
      image: "pngwing.com.png",
      content:
        "Aktif işin yok. Hemen kategorilerden, ihtiyacın olan hizmete kolayca ulaş.",
    },
    {
      title: "Pasif işlerim",
      image: null,
      content:
      "Aktif işin yok.",
      button: "Teklif gelmedi",
    },
  ];

  const getApiAktif = async () => {
    try {
      const response = await axios.get("http://localhost:5233/aktifTadilat");
      setItemsAktif(response.data || []);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  useEffect(() => {
    getApiAktif();
  }, []);

  useEffect(() => {
    const initialState = {};
    itemsAktif.forEach((item) => {
      initialState[item._id] = item.durum === "aktif";
    });
    setShowText(initialState);
  }, [itemsAktif]);

  const handleSubmit = async (e, id) => {
    console.log(id)
    e.preventDefault();
    const newDurum = showText[id] ? "pasif" : "aktif";
    try {
      await axios.put(`http://localhost:5233/aktifTadilat/durum/${id}`, {
        durum: newDurum,
      });
      setShowText((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      setItemsAktif((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, durum: newDurum } : item
        )
      );
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
    }
  };


  const aktifIsler = itemsAktif.filter((item) => item.durum === "aktif");
  const pasifIsler = itemsAktif.filter((item) => item.durum === "pasif" || item.durum === "iptal");
const storedData=JSON.parse(localStorage.getItem("kullanici"))

  const aktifMi = openIndex === 0;
  const seciliIsler = aktifMi ? aktifIsler : pasifIsler;
  const filteredData=seciliIsler.filter((item)=>item.email === storedData?.kullanici?.email)
  return (
    <>

      <div className="flex gap-4 mb-4 justify-center">
        {tabs.map((item, index) => (
          <button
            key={index}
            className={`py-3 px-2 font-semibold rounded-md ${openIndex === index ? "border-b-2 border-[rgb(255,200,60)]" : ""
              }`}
            onClick={() => setOpenIndex(index)}
          >
            {item.title}
          </button>
        ))}
      </div>




      <div className="p-4">
        {filteredData.length === 0 ? (
          <div className="flex justify-center items-center bg-gray-50 h-[50vh] flex-col w-full">
            <img src={tabs[openIndex].image} width="40%" />
            <p className="font-bold text-gray-400 mt-4">{tabs[openIndex].content}</p>
            {tabs[openIndex].button && (
              <button className="bg-gray-100 p-3 rounded-md font-bold mt-2">
                {tabs[openIndex].button}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="flex flex-col justify-between h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <form onSubmit={(e) => handleSubmit(e, item._id)}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      {item.anaBaslik}
                    </h3>
                    <button type="submit">
                      {showText[item._id] ? (
                        <ToggleOnIcon className="text-green-500" />
                      ) : (
                        <ToggleOffIcon className="text-[rgb(255,200,60)]" />

                      )}
                    </button>
                  </div>
                </form>


                {item.veriler &&
                  item.veriler.map((veri, i) => (
                    <div
                      key={i}
                      className="mb-3 cursor-pointer"
                      onClick={() =>
                        router.push(`/hizmet/${item.primaryKey}`)
                      }
                    >
                      <p className="font-semibold text-gray-700">
                        {veri.kategoriIsim}: {veri.secilen}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium text-[rgb(255,200,60)]">
                          Seçenekler:
                        </span>{" "}
                        {veri.secenekler.join(", ")}
                      </p>
                    </div>
                  ))}

                <div className="mt-4 pt-2 border-t text-sm text-gray-500">
                  <p>
                    <span className="font-medium text-gray-700">Telefon:</span>{" "}
                    {item.telefonNo || "Belirtilmemiş"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Konum:</span>{" "}
                    {item.konum || "Belirtilmemiş"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Durumu:</span>{" "}
                    <span
                      className={
                        item.durum === "iptal"
                          ? "text-red-600 font-semibold"
                          : item.durum === "aktif"
                            ? "text-green-600 font-semibold"
                            : item.durum === "pasif"
                              ? "text-[[rgb(255,127,58)]] font-semibold"
                              : "text-gray-500 italic"
                      }
                    >
                      {item.durum || "Belirtilmemiş"}
                    </span>
                    <p>
                      <span className="font-medium text-gray-700">Süre:</span>{" "}
                      {item.baslangicTarihi && item.bitisTarihi
                        ? `${new Date(item.baslangicTarihi).toLocaleDateString("tr-TR")} - ${new Date(item.bitisTarihi).toLocaleDateString("tr-TR")}`
                        : "süresiz"}
                    </p>

                  </p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="col-span-12 min-h-screen pt-5 border-t border-t-gray-100">
        <Slider />
      </div>
    </>
  );
};

export default Home;

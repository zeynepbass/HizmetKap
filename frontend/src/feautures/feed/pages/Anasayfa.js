"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/Slider";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import {updateDurum} from "@/services/api"
import { Button } from "@/shared/components/atoms";
export default function Anasayfa ({itemsAktif: initialItems}) {
  const router = useRouter();
const [itemsAktif,setItemsAktif]=useState(initialItems)
  const [showText, setShowText] = useState({});
  const [openIndex, setOpenIndex] = useState(0);
  const [storedData, setStoredData] = useState("");
  const tabs = [
    {
      title: "Aktif işlerim",
      image: "9315312.png",
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


  useEffect(() => {
    const initialState = {};
    itemsAktif.forEach((item) => {
      initialState[item._id] = item.durum === "aktif";
    });
    setShowText(initialState);
    const kullanici=JSON.parse(localStorage.getItem("kullanici"))
    setStoredData(kullanici)
  }, [itemsAktif]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const result = await updateDurum(id, showText[id],false);
    if (result.success) {
      setShowText((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
  
      setItemsAktif((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, durum: result.newDurum } : item
        )
      );
    }
  };

  const aktifIsler = itemsAktif.filter((item) => item.durum === "aktif");
  const pasifIsler = itemsAktif.filter((item) => item.durum === "pasif" || item.durum === "iptal");


  const aktifMi = openIndex === 0;
  const seciliIsler = aktifMi ? aktifIsler : pasifIsler;
  const filteredData=seciliIsler.filter((item)=>item?.email === storedData?.email)
  return (
    <div className="min-h-screen flex flex-col ">


    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-4 px-4 sm:px-0">
      {tabs.map((item, index) => (
        <Button
        onClick={() => setOpenIndex(index)}
        type="button"
        key={index}
        className={`py-3 px-2 font-semibold text-gray-600 rounded-md ${openIndex === index ? "border-b-2 border-[rgb(255,200,60)]" : ""
          }`}
      >
          {item.title}
      </Button>

      ))}
    </div>
  

    <div className="h-[50vh]">
      {filteredData.reverse().length === 0 ? (
        <div className="flex flex-col  h-[50vh] items-center justify-center pb-4 bg-gray-50 w-full text-center">
          {tabs[openIndex].image && (
            <img src={tabs[openIndex].image} className="w-[50vh]" />
          )}
          <p className="font-bold text-[rgb(242,247,250)] mb-2">{tabs[openIndex].content}</p>
          {tabs[openIndex].button && (
            <Button

className="text-gray-500 p-3 rounded-md font-bold mt-2"
                >
   {tabs[openIndex].button}
          </Button>

          )}
        </div>
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[40vh] scrollbar scrollbar-thumb-gray-50 scrollbar-track-gray-50">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-4 bg-white border border-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <form onSubmit={(e) => handleSubmit(e, item._id)}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-600">{item.anaBaslik}</h3>
                  <Button

type="submit"

>
{showText[item._id] ? (
                      <ToggleOnIcon className="text-[rgb(255,176,73)]" />
                    ) : (
                      <ToggleOffIcon className="text-[rgb(242,247,250)]" />
                    )}
</Button>
 
                </div>
              </form>
  
              {item.veriler &&
                item.veriler.map((veri, i) => (
                  <div
                    key={i}
                    className="mb-3 cursor-pointer"
                    onClick={() => router.push(`/hizmet/${item.primaryKey}`)}
                  >
                    <p className="font-bold text-gray-700">
                      {veri.kategoriIsim}: {veri.secilen}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium text-[rgb(78,36,77)]">Seçenekler:</span>{" "}
                      {veri.secenekler.join(", ")}
                    </p>
                  </div>
                ))}
  
              <div className="mt-4 pt-2 border-t border-gray-200 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-700">Telefon:</span> {item.telefonNo || "Belirtilmemiş"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Konum:</span> {item.konum || "Belirtilmemiş"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Durumu:</span>{" "}
                  <span
                    className={
                      item.durum === "iptal"
                        ? "text-red-600 font-semibold"
                        : item.durum === "aktif"
                        ? "text-[rgb(255,176,73)] font-semibold"
                        : item.durum === "pasif"
                        ? "text-[rgb(255,176,73)]  "
                        : "text-gray-400"
                    }
                  >
                    {item.durum || "Belirtilmemiş"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Süre:</span>{" "}
                  {item.baslangicTarihi && item.bitisTarihi
                    ? `${new Date(item.baslangicTarihi).toLocaleDateString("tr-TR")} - ${new Date(item.bitisTarihi).toLocaleDateString("tr-TR")}`
                    : "süresiz"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  

    <div className="w-full pt-5 border-t border-gray-100">
      <Slider />
    </div>
  </div>
  
  );
};



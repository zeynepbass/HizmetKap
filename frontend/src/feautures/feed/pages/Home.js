"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {HomeSlider} from "../components/HomeSlider";
import {HomeIsTabs} from "../components/HomeIsTabs"
import {HomeEmptyState} from "../components/HomeEmptyState"
import {HomeIsCard} from "../components/HomeIsCard/HomeIsCard"
import {updateDurum} from "@/features/feed/api"
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


<HomeIsTabs
  tabs={tabs}
  openIndex={openIndex}
  setOpenIndex={setOpenIndex}
/>
  

    <div className="h-[50vh]">
  {filteredData.length === 0 ? (
    <HomeEmptyState tab={tabs[openIndex]} />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-[40vh]">
      {[...filteredData].reverse().map((item) => (
        <HomeIsCard
          key={item._id}
          item={item}
          showText={showText}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  )}
</div>
  

    <div className="w-full pt-5 border-t border-gray-100">
      <HomeSlider />
    </div>
  </div>
  
  );
};



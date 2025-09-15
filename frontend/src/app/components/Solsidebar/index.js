"use client"
import React, { useEffect, useState } from 'react'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import TextsmsIcon from '@mui/icons-material/Textsms';
import HesapDetails from "../../components/HesapDetails"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from "axios"
const Index = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState([])
  const [active, setActive] = useState(false)
  const router = useRouter();
  const fetchCtegory = async () => {
    try {
      await axios.get("http://localhost:5233/kategori")
        .then((response) => setCategory(response.data))

    } catch (error) {
      console.log(error)
    }
  }

  const [storedData, setStoredData] = useState(null);
  const toSlug = (text) => {
    return text
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
  useEffect(() => {
    fetchCtegory()
    const data = JSON.parse(localStorage.getItem("kullanici"))
    setStoredData(data)
  }, [])
  const handleClick = (id) => {

    setActive(id)
  }
  const sidebar = [
    { id: 1, text: "İşlerim", icon: <HomeRepairServiceIcon />, href: "/ana-sayfa" },
    { id: 2, text: "Mesaj Kutusu", icon: <TextsmsIcon />, href: `/mesaj-kutusu/${storedData?.kullanici.id}` }
  ];
  return (
    <div className="relative p-4 border-r border-none top-0 h-screen overflow-y-auto bg-white">



      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-full h-200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 81"
        >
          <path
            d="M0,0 C0,500 0,0 10,80 C500,10 120,120 1335,0 L1200,0 L0,0 Z"
            className="fill-[rgb(78,36,77)]"
          ></path>
        </svg>
      </div>



      <div className="relative z-10 mt-4">
        <div className="pt-5 pb-5 w-full">
          <Link href="/ana-sayfa" className="flex items-center gap-2">
            <span>
              <img src="/sidebarLogo.png" className="w-12 h-12 rounded-2xl" alt="Hizmet Kap Logo" />
            </span>
            <span className="text-[rgb(242,247,250)] font-bold text-[20px]">
              Hizmet Kap
            </span>
          </Link>
        </div>


        <div className="flex items-center rounded-3xl pr-2">
          <input
            type="text"
            placeholder="Başka bir ihtiyacın?"
            className="flex-1 p-2 focus:outline-none focus:ring-2 rounded-4xl  focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
          />
          <SavedSearchIcon
            className="cursor-pointer text-[rgb(78,36,77)] absolute right-4"
            onClick={() => setOpen(!open)}
          />
        </div>

        {open && (
          <div className=" rounded-2xl p-4 mt-3 shadow-lg w-full bg-[rgb(78,36,77)]">
            <h6 className="text-gray-200 font-semibold mb-3">Popüler hizmetler</h6>
            <ul className="space-y-3">
              {category.map((item) => (
                <li
                  key={item.isim}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white hover:shadow transition-all duration-200"
                  onClick={() => router.push(`/${toSlug(item.isim)}`)}
                >
                  <img
                    src={item.resim}
                    alt={item.isim}
                    width="36"
                    height="36"
                    className="rounded-full object-cover"
                  />
                  <span className="capitalize font-medium text-gray-200">{item.isim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}


        <ul className="pt-5 flex gap-3">
          {sidebar.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center gap-1 p-3 rounded-3xl cursor-pointer 
                ${open ? "text-gray-600" : "text-gray-200"}
        ${active === item.id ? " text-gray-200 hover:text-[rgb(255,176,73)]" : "text-gray-200"}`}
            >
              {item.icon}
              <Link href={item.href}>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>


      </div>

      <HesapDetails />
    </div>


  )
}

export default Index

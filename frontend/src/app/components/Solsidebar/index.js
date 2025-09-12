"use client"
import React, { useEffect, useState } from 'react'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
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
  }, [])


  return (
    <div className="relative p-4 border-r border-none top-0 h-screen overflow-y-auto bg-white">



      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-full h-200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C0,500 0,0 10,80 C500,10 120,120 1335,0 L1200,0 L0,0 Z"
            className="fill-[rgb(255,127,58)]"
          ></path>
        </svg>
      </div>



      <div className="relative z-10 mt-4">
        <div className="pt-5 pb-5">
          <Link href="/ana-sayfa">
            <img src="/logo.png" width="50%" height="50" />
          </Link>
        </div>

        <div className="flex items-center rounded-3xl border border-white pr-2">
          <input
            type="text"
            placeholder="Başka bir ihtiyacın?"
            className="flex-1 p-2 focus:outline-none"
          />
          <SavedSearchIcon
            className="cursor-pointer text-[rgb(255,200,60)]"
            onClick={() => setOpen(!open)}
          />
        </div>

        {open && (
          <div className="border bg-white border-white rounded-xl p-2 mt-2">
            <h6 className="text-gray-500">Popüler hizmetler</h6>
            <ul className="space-y-4 text-gray-600 mt-4">
              {category.map((item) => (
                <li
                  className="capitalize flex gap-1 cursor-pointer"
                  onClick={() => router.push(`/${toSlug(item.isim)}`)}
                >
                  <img src={item.resim} width="30" height="30" className="rounded-4xl" />
                  <span>{item.isim} </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="pt-5">
          <li
            onClick={() => setActive(!active)}
            className={`flex items-center gap-2 pt-3 rounded-3xl ${active ? "bg-amber-400 text-white" : "bg-white text-gray-600"
              } p-3`}
          >
            <HomeRepairServiceIcon className="text-xl" />
            <span>İşlerim</span>
          </li>
        </ul>

      </div>

      <HesapDetails />
    </div>


  )
}

export default Index

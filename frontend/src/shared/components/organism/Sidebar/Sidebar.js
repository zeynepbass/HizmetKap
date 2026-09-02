"use client";
import { useEffect, useState } from "react";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import TextsmsIcon from "@mui/icons-material/Textsms";
import {Hesapdetay} from "@/feautures/user/components/Hesapdetay";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getKategoriler } from "@/services/api";
export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(false);
  const router = useRouter();
  const fetchCtegory = async () => {
    try {
      const res = await getKategoriler();
      setCategory(res);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchCtegory();
    const data = JSON.parse(localStorage.getItem("kullanici"));
    setStoredData(data);
  }, []);
  const handleClick = (id) => {
    setActive(id);
  };
  const sidebar = [
    {
      id: 1,
      text: "İşlerim",
      icon: <HomeRepairServiceIcon />,
      href: "/ana-sayfa",
    },
    {
      id: 2,
      text: "Mesaj Kutusu",
      icon: <TextsmsIcon />,
      href: `/mesaj-kutusu/${storedData?.id}`,
    },
  ];
  return (
    <div className="relative p-5 top-0 h-screen overflow-y-auto bg-white shadow-md">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg
          className="relative block w-full h-28"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 40"
        >
          <path
            d="M0,0 C0,500 0,0 10,80 C500,10 120,120 1335,0 L1200,0 L0,0 Z"
            className="fill-[rgb(78,36,77)]"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 mt-4">
        <div className="pt-3 pb-6 w-full flex items-center gap-3 px-2">
          <Link href="/ana-sayfa" className="flex items-center gap-2">
            <img
              src="/sidebarLogo.png"
              className="w-12 h-12 rounded-2xl shadow-lg border border-gray-200"
              alt="Hizmet Kap Logo"
            />
            <span className="text-white font-extrabold text-xl tracking-wide">
              Hizmet Kap
            </span>
          </Link>
        </div>

        <div className="flex items-center rounded-full pr-2 bg-[rgb(242,247,250)] shadow-inner focus-within:ring-2 focus-within:ring-[rgb(255,176,73)]">
          <input
            type="text"
            placeholder="Başka bir ihtiyacın?"
            className="flex-1 p-3 rounded-full bg-transparent text-gray-700 focus:outline-none"
          />
          <SavedSearchIcon
            className="cursor-pointer text-[rgb(78,36,77)] mr-3"
            onClick={() => setOpen(!open)}
          />
        </div>

        {open && (
          <div className="rounded-2xl p-5 mt-4 shadow-xl w-full bg-[rgb(78,36,77)]">
            <h6 className="text-gray-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Popüler Hizmetler
            </h6>
            <ul className="space-y-3">
              {category?.map((item) => (
                <li
                  key={item.isim}
                  className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:opacity-20 hover:shadow-md transition-all duration-200"
                  onClick={() => router.push(`/${toSlug(item.isim)}`)}
                >
                  <img
                    src={item.resim}
                    alt={item.isim}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                  <span className="capitalize font-medium text-gray-100">
                    {item.isim}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!open && (
          <ul className="pt-7 flex flex-col gap-3">
            {sidebar.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200
            ${
              active === item.id
                ? "bg-[rgb(78,36,77)] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
              >
                {item.icon}
                <Link href={item.href}>
                  <span className="font-medium">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <Hesapdetay />
      </div>
    </div>
  );
};



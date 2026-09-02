"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Button } from "@/shared/components/atoms";

import {
  activeUpdated,
  getAktifTadilatDetails,
  fetchUsersGet,
  fetchKonusmalarGet,
} from "@/services/api";

import { ServiceContactForm } from "../components/ServiceContactForm";
import { ServiceDetails } from "../components/ServiceDetails";
import { ServiceOptions } from "../components/ServiceOptions";
import { ServiceMessageUsers } from "../components/ServiceMessageUsers";

export default function Hizmet({ paramsId }) {
  const router = useRouter();
  const id = paramsId;

  const [storedData, setStoredData] = useState({});
  const [chat, setChat] = useState([]);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState([]);
  const [phone, setPhone] = useState("");
  const [sure, setSure] = useState(null);
  const [promptPhone, setPromptPhone] = useState(false);

  const fetchData = async (id) => {
    try {
      const res = await getAktifTadilatDetails(id);
      setStoredData(res);
    } catch (err) {
      console.error("Veri çekilemedi:", err);
    }
  };

  const fetchDataKonusmalar = async (id) => {
    try {
      const res = await fetchKonusmalarGet(id);
      setChat(res);
    } catch (err) {
      console.error("Veri çekilemedi:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetchUsersGet();
      setUser(res);
    } catch (error) {
      console.error("Kullanıcılar alınamadı:", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("kullanici") || "{}"
    );

    const getChat = storedUser?.id;

    fetchData(id);
    fetchUser();

    if (getChat) {
      fetchDataKonusmalar(getChat);
    } else {
      console.warn(
        "Kullanıcı ID bulunamadığı için chat fetch edilemiyor."
      );
    }
  }, [id]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(
          `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        );
      });
    } else {
      alert("Tarayıcı konumu desteklemiyor!");
    }
  };

  const handleGetPhone = () => {
    setPromptPhone((prev) => !prev);
  };

  const handleGetCalendar = () => {
    setSure((prev) => (prev ? null : new Date()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      konum: location,
      telefonNo: phone,
      bitisTarihi: sure ? sure.toISOString() : null,
    };

    try {
      await activeUpdated(id, formData);

      setLocation("");
      setPhone("");
      setPromptPhone(false);
      setSure(null);

      await fetchData(id);

      const storedUser = JSON.parse(
        localStorage.getItem("kullanici") || "{}"
      );

      if (storedUser?.id) {
        await fetchDataKonusmalar(storedUser.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = user.filter((userItem) =>
    chat.some(
      (chatItem) =>
        chatItem.gonderenId === userItem._id
    )
  );

  return (
    <>
      <Button
        onClick={() => router.back()}
        className="ml-4 cursor-pointer text-[rgb(237,203,206)]"
      >
        <ArrowBackIcon sx={{ fontSize: 35 }} />
      </Button>

      <div className="flex flex-col items-center mx-auto gap-6 min-h-[100vh]">
        <div className="w-full max-w-xlg text-center h-[100vh] overflow-auto">

          <ServiceContactForm
            location={location}
            phone={phone}
            sure={sure}
            promptPhone={promptPhone}
            setPhone={setPhone}
            setSure={setSure}
            handleGetLocation={handleGetLocation}
            handleGetPhone={handleGetPhone}
            handleGetCalendar={handleGetCalendar}
            handleSubmit={handleSubmit}
          />

          <ServiceDetails data={storedData} />

          <ServiceOptions
            options={storedData?.veriler}
          />

          <ServiceMessageUsers
            users={filteredData}
          />

        </div>
      </div>
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Details } from "@/services/api";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Hesapdetay(){
  const [data, setData] = useState({});
  const [kullaniciAdi, setKullaniciAdi] = useState(null);
  const router = useRouter();

  const fetchData = async (id) => {
    try {
      const res = await Details(id);
      setData(res.data);
     
    } catch (error) {
      console.error("Kullanıcı verisi alınamadı:", error);
    }
  };

  useEffect(() => {

    const stored = JSON.parse(localStorage.getItem("kullanici"));

    const adStored = localStorage.getItem("kullaniciAdi");
    setKullaniciAdi(adStored);

    const id = stored?.id || adStored?.id;

    if (id) fetchData(id);
  }, []);

  return (
    <Card
      sx={{
        position: "absolute",
        bottom: "60px",
        left: "10%",
        display: "flex",
        boxShadow: 2,
        width: "70%",
        borderRadius: 2,
        p: 1,
        alignItems: "center",
        gap: 2,
      }}
    >

      {kullaniciAdi ? (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgb(255,190,60)] text-[rgb(242,247,250)] uppercase font-bold">
          {kullaniciAdi[0]}
        </div>
      ) : (
        data.resim && (
          <CardMedia
            component="img"
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
            image={`http://localhost:5233/uploads/${data.resim}`}
            alt="kullanıcı resmi"
          />
        )
      )}


      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="div"
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "gray" }}
        >
          {data.ad} {data.soyad} {kullaniciAdi?.kullaniciAdi}
        </Typography>

        <Typography
          component="div"
          variant="body2"
          sx={{ color: "gray", fontSize: 12 }}
        >
          {data.email}
        </Typography>

        <span
          onClick={() => router.push("/hesap-bilgilerim")}
          className="underline text-[rgb(255,176,73)] cursor-pointer text-sm"
        >
          Ayarlar
        </span>
      </Box>
    </Card>
  );
};



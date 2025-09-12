"use client"
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import axios from "axios"

const Index = () => {
  const [data, setData] = useState({});
  const [kullaniciStored, setKullaniciStored] = useState(null);
  const [kullaniciAdi, setKullaniciAdi] = useState(null);
  const router = useRouter();

  useEffect(() => {

    const stored = JSON.parse(localStorage.getItem("kullanici"));
    const adStored = JSON.parse(localStorage.getItem("kullaniciAdi"));

    setKullaniciStored(stored);
    setKullaniciAdi(adStored);

    if (stored) {
      fetchData(stored?.kullanici._id || stored?.kullanici.id );
    }
  }, []);

  const fetchData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5233/kullanici/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Kullanıcı verisi alınamadı:", error);
    }
  }



  return (
    <Card sx={{ position: "absolute", bottom: "10px", display: "flex", boxShadow: 2,width:"70%", borderRadius: 2, p: 1, alignItems: "center", gap: 2 }}>
      {kullaniciAdi ? (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgb(255,190,60)] text-white uppercase font-bold">
          {kullaniciAdi?.kullaniciAdi[0]}
        </div>
      ) : 
      <CardMedia
        component="img"
        sx={{ width: 50, height: 50, borderRadius: "50%" }}
        image={data.resim ? `http://localhost:5233/uploads/${data.resim}` : "/profile.jpg"}
        alt="kullanıcı resmi"
      />}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="div" variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {data.ad} {data.soyad}  {kullaniciAdi?.kullaniciAdi}
        </Typography>
        <Typography component="div" variant="body2" sx={{ color: "gray", fontSize: 12 }}>
          {data.email}
        </Typography>
        <span
          onClick={() => router.push("/hesap-bilgilerim")}
          className="underline text-[rgb(255,200,60)] cursor-pointer text-sm"
        >
          Ayarlar
        </span>
      </Box>
    </Card>
  )
}

export default Index;

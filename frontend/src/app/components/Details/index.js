"use client";
import React, { useState, useEffect } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Index = () => {
    const [storedData, setStoredData] = useState([]);
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("item")) || [];
        setStoredData(data);
    }, []);

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
        const userPhone = prompt("Telefon numaranızı girin:");
        if (userPhone) setPhone(userPhone);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">

            <ul className="list-none space-y-4">
                <li className="flex items-center justify-between gap-2 bg-gray-100 p-4 rounded shadow">
                    <div className="flex items-center gap-2">
                        <AddLocationAltIcon className="w-8 h-8 text-amber-500" />
                        <span>{location || "Konum Verilmedi"}</span>
                    </div>
                    <button
                        onClick={handleGetLocation}
                        className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-600"
                    >
                        Konum Al
                    </button>
                </li>

                <li className="flex items-center justify-between gap-2 bg-gray-100 p-4 rounded shadow">
                    <div className="flex items-center gap-2">
                        <LocalPhoneIcon className="w-8 h-8 text-green-500" />
                        <span>{phone || "Telefon Verilmedi"}</span>
                    </div>
                    <button
                        onClick={handleGetPhone}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                        Telefon Ekle
                    </button>
                </li>
            </ul>

            <hr />


            <h1 className="text-3xl font-bold">Detaylar</h1>
            {storedData.length > 0 && storedData[0].anaBaslik && (
  <div className="mb-4 text-xl font-bold text-gray-800 text-center">
    {storedData[0].anaBaslik}
  </div>
)}
            <ul className="list-none space-y-4">
                <div className="flex flex-wrap gap-3">
                    {storedData.map((item, index) => {
                        if (typeof item === "object") {
                            return (
                                <li
                                    key={index}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full"
                                >
                                    <div className="flex flex-col">
                                 
                                        <span className="font-semibold text-gray-800">{item.kategoriIsim}</span>
                                        {item.secenekler && (
                                            <span className="text-gray-500 text-sm">
                                                Seçenekler: {item.secenekler.join(", ")}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="font-medium text-green-600">Seçilen: {item.secilen}</span>
                                        {item.durum && (
                                            <span className="text-sm text-gray-500">Durum: {item.durum}</span>
                                        )}
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 text-gray-700 p-3 rounded-lg font-semibold shadow-sm flex-1 min-w-[150px] text-center"
                                >
                                    {item}
                                </div>
                            );
                        }
                    })}
                </div>

            </ul>




            <div className="mt-6">
                <span className="text-xl font-bold">Mesajlar</span>
                <Card sx={{ display: "flex", mt: 2, borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 140 }}
                        image="/static/images/cards/live-from-space.jpg"
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h6">
                                Live From Space
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: "text.secondary" }}
                            >
                                Mac Miller
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </div>
    );
};

export default Index;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ScheduleIcon from '@mui/icons-material/Schedule';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trLocale from 'date-fns/locale/tr';
import KonumHarita from "../Konum";
const Index = ({ id }) => {


    const [storedData, setStoredData] = useState({});
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [sure, setSure] = useState("");

    const [promptPhone, setPromptPhone] = useState(false);
    const fetchData = async () => {
        if (!id) return;
        try {
          const res = await axios.get(`http://localhost:5233/aktifTadilat/${id}`);
          setStoredData(res.data);
        } catch (err) {
          console.error("Veri çekilemedi:", err);
        }
      };

      useEffect(() => {
        fetchData();
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
        setPromptPhone(!promptPhone);
    };
    const handleGetCalendar = () => {
        setSure(!sure)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            konum: location,
            telefonNo: phone,
            bitisTarihi: sure
        };

        try {

            await axios.put(
                `http://localhost:5233/aktifUpdated/${id}`,
                formData
            );
            setLocation("");
            setPromptPhone("");
            setSure("");
            fetchData(); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <ul className="list-none space-y-4">
                <form onSubmit={handleSubmit}>
                    <li className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4">
                        <div className="flex w-full items-center gap-2">
                            <AddLocationAltIcon className="w-8 h-8 text-[rgb(255,200,60)]" />

                            {location ? (
                                <input
                                    type="text"
                                    value={location}
                                    readOnly
                                    className="border w-full border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Konumunuz"
                                />
                            ) : (
                                <span className="text-gray-500">Konum Verilmedi</span>
                            )}
                        </div>
                        {location ?


                            null : <button
                                type="button"
                                onClick={handleGetLocation}
                                className="bg-[rgb(255,200,60)] w-1/2 text-white px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                            >
                                Konum Al
                            </button>}

                    </li>

                    <li className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4">
                        <div className="flex items-center gap-2 w-full">
                            <LocalPhoneIcon className="w-8 h-8 text-green-500" />
                            {promptPhone ? (
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border w-full border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-hover:bg-[rgb(255,127,58)]"
                                    placeholder="Telefon numaranız"
                                />
                            ) : (
                                <span className="text-gray-500">Telefon Verilmedi</span>
                            )}
                        </div>
                        {promptPhone ?
                            null : <button
                                type="button"
                                onClick={handleGetPhone}
                                className="bg-green-500 w-1/2 text-white px-4 py-1 rounded hover:bg-green-600"
                            >
                                Telefon Ekle
                            </button>}

                    </li>
                    <li className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4">
                        <div className="flex w-full items-center gap-2">
                            <ScheduleIcon className="w-8 h-8 text-[rgb(255,200,60)]" />

                            {sure ? (
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                    <DatePicker
                                        label="Tarih Seç"
                                        value={sure}
                                        onChange={(newValue) => setSure(newValue)}
                                        inputFormat="dd/MM/yyyy"
                                        mask="__/__/____"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            border: 'none',
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>


                            ) : (
                                <span className="text-gray-500">Bitiş süresi belirtilmemiş</span>
                            )}
                        </div>
                        {sure ?


                            null : <button
                                type="button"
                                onClick={handleGetCalendar}
                                className="bg-[rgb(255,200,60)] w-1/2 text-white px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                            >
                                Bitiş Tarihi Ekle
                            </button>}

                    </li>
                    <div>
                        {promptPhone || location || sure ? <button
                            type="submit"
                            className="bg-amber-600 w-full text-white px-4 py-2 rounded"
                        >
                            Tümünü Kaydet
                        </button> : null}

                    </div>
                </form>

            </ul>

            <hr />

            <h1 className="text-3xl font-bold text-center">Detaylar</h1>
            <span className="mb-4 text-xl font-bold text-gray-800 text-left">
                {storedData.anaBaslik}
            </span>

            <div className="mb-4 text-xl font-bold text-gray-800 text-left">
                <span className="text-sm text-gray-500">
                    Durum: {storedData.durum}<br />
                    İlan Tarihi:{new Date(storedData.baslangicTarihi).toLocaleDateString("TR-tr")}
                    {storedData.bitisTarihi ?
                        <>
                            -{new Date(storedData.bitisTarihi).toLocaleDateString("TR-tr")}
                        </>
                        : null}<br />
                    {storedData.konum ? (
                        <div>
                            <p className="font-medium text-gray-700 mb-2">Konum:</p>
                            <KonumHarita konum={storedData.konum} />
                        </div>
                    ) : null}




                </span><br />

            </div>

            <ul className="list-none space-y-4">
                <div className="flex flex-wrap gap-3">

                    <ul className="space-y-4 w-full">
                        {storedData.veriler && storedData.veriler.map((item) => {
                            return (
                                <li key={item._id}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full"
                                >
                                    <div className="flex flex-col">

                                        <span className="font-semibold text-gray-800">
                                            {item.kategoriIsim || "Kategori belirtilmemiş"}
                                        </span>

                                        {Array.isArray(item.secenekler) && item.secenekler.length > 0 && (
                                            <span className="text-gray-500 text-sm">
                                                Seçenekler: {item.secenekler.join(", ")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="font-medium text-green-600">
                                            Seçilen: {item.secilen || "Yok"}
                                        </span>




                                    </div>
                                </li>
                            )
                        })}


                    </ul>


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

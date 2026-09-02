"use client";
import { useState, useEffect } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ScheduleIcon from '@mui/icons-material/Schedule';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button,Heading } from "@/shared/components/atoms";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trLocale from 'date-fns/locale/tr';
import KonumHarita from "../Konum";
import { activeUpdated, getAktifTadilatDetails, fetchUsersGet, fetchKonusmalarGet } from "@/services/api"

export default function Detay ({ paramsId }){
    const id = paramsId;

    const [storedData, setStoredData] = useState({});
    const [chat, setChat] = useState([]);

    const [location, setLocation] = useState("");
    const [user, setUser] = useState([]);
    const [phone, setPhone] = useState("");
    const [sure, setSure] = useState("");

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

    const fethUser = async () => {
        try {
            const res = await fetchUsersGet()
            setUser(res)
        } catch (error) {

        }
    }
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("kullanici") || "{}");
        const getChat = storedData?.id;
        fetchData(id);
        fethUser();

        if (getChat) {
            fetchDataKonusmalar(getChat);
        } else {
            console.warn("Kullanıcı ID bulunamadığı için chat fetch edilemiyor.");
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
            bitisTarihi: sure ? sure.toISOString() : null
        };

        try {

            await activeUpdated(id, formData)
            setLocation("");
            setPromptPhone(false);
            setSure(null);

            fetchData(id);
            fetchKonusmalarGet()
        } catch (error) {
            console.log(error);
        }
    };
    const filteredData = user.filter(userItem =>
        chat.some(chatItem => chatItem.gonderenId === userItem._id)
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
            <Heading 
            
            className="text-md font-bold mb-4 text-gray-600" title="    İletişim Bilgilerini ve Konumunu Eklemek İster misin?"/>
   
        <div className="max-w-3xl mx-auto p-4 space-y-6 ">
            <ul className="list-none space-y-4">
                <form onSubmit={handleSubmit}>
                    <li className="flex items-center justify-between bg-[rgb(242,247,250)] p-4 rounded shadow mb-4">
                        <div className="flex w-full items-center gap-2">
                            <AddLocationAltIcon className="w-8 h-8 text-[rgb(255,176,73)]" />

                            {location ? (
                                <input
                                    type="text"
                                    value={location}
                                    readOnly
                                    className="border w-full border-gray-100 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,58)]"
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
                                className="bg-[rgb(255,176,73)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                            >
                                Konum Al
                            </button>}

                    </li>

                    <li className="flex items-center justify-between bg-[rgb(242,247,250)] p-4 rounded shadow mb-4">
                        <div className="flex items-center gap-2 w-full">
                            <LocalPhoneIcon className="w-8 h-8 text-[rgb(78,36,77)]" />
                            {promptPhone ? (
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border w-full border-gray-100 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,58)]"
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
                                className="bg-[rgb(78,36,77)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                            >
                                Telefon Ekle
                            </button>}

                    </li>
                    <li className="flex items-center justify-between bg-[rgb(242,247,250)] p-4 rounded shadow mb-4">
                        <div className="flex w-full items-center gap-2">
                            <ScheduleIcon className="w-8 h-8 text-[rgb(236,203,206)]" />

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
                                className="bg-[rgb(236,203,206)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                            >
                                Bitiş Tarihi Ekle
                            </button>}

                    </li>
                    <div>
                        {promptPhone || location || sure ? <button
                            type="submit"
                            className="bg-[rgb(255,176,73)] w-full text-[rgb(242,247,250)] px-4 py-2 rounded"
                        >
                            Tümünü Kaydet
                        </button> : null}

                    </div>
                </form>

            </ul>

            <hr className="text-gray-100" />
<Heading title="Detaylar" className="text-3xl font-bold text-center text-gray-600"/>

            <span className="mb-4 text-xl font-bold text-gray-600 text-left">
                {storedData?.anaBaslik}
            </span>

            <div className="mb-4 text-xl font-bold text-gray-600 text-left">
                <span className="text-sm text-gray-400">
                    Durum: {storedData?.durum}<br />
                    İlan Tarihi:{new Date(storedData?.baslangicTarihi).toLocaleDateString("TR-tr")}
                    {storedData?.bitisTarihi ?
                        <>
                            -{new Date(storedData?.bitisTarihi).toLocaleDateString("TR-tr")}
                        </>
                        : null}<br />
                    {storedData?.konum ? (
                        <div>
                            <p className="font-medium text-gray-700 mb-2">Konum:</p>
                            <KonumHarita konum={storedData?.konum} />
                        </div>
                    ) : null}




                </span><br />

            </div>

            <ul className="list-none space-y-4">
                <div className="flex flex-wrap gap-3">

                    <ul className="space-y-4 w-full">
                        {storedData?.veriler && storedData?.veriler.map((item) => {
                            return (
                                <li key={item._id}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition w-full"
                                >
                                    <div className="flex flex-col">

                                        <span className="font-semibold text-gray-600">
                                            {item.kategoriIsim || "Kategori belirtilmemiş"}
                                        </span>

                                        {Array.isArray(item.secenekler) && item.secenekler.length > 0 && (
                                            <span className="text-gray-500 text-sm">
                                                Seçenekler: {item.secenekler.join(", ")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                        <span className="font-medium text-[rgb(78,36,77)]">
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
                <span className="text-xl font-bold text-gray-600">Mesajlar</span>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Card sx={{ display: "flex", mt: 2, borderRadius: 2, boxShadow: 3 }}>
                        {filteredData.map(item => {
                            return (

                                <>

                                    {item.resim ? <CardMedia
                                        component="img"
                                        sx={{ width: 140 }}

                                        image={item.resim}
                                        alt=""
                                    /> : null}

                                    <CardContent key={item._id} sx={{ flex: "1 0 auto" }}>
                                        <Typography component="div" variant="h6">
                                            {item.ad.toUpperCase()} {item.soyad.toUpperCase()}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {item.email}
                                        </Typography>
                                    </CardContent>


                                </>
                            )
                        })
                        }
                    </Card>
                </Box>

            </div>
        </div>
        </div>
        </div>      </>
    );
};



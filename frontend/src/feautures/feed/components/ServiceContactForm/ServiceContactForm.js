"use client";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import trLocale from "date-fns/locale/tr";

import { Button, Heading,Input } from "@/shared/components/atoms";

export function ServiceContactForm({
  location,
  phone,
  sure,
  promptPhone,
  setPhone,
  setSure,
  handleGetLocation,
  handleGetPhone,
  handleGetCalendar,
  handleSubmit,
}) {
  return (
    <>
      <Heading
        className="text-md font-bold mb-4 text-gray-600"
        title="İletişim Bilgilerini ve Konumunu Eklemek İster misin?"
      />

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <ul className="list-none space-y-4">
          <form onSubmit={handleSubmit}>


            <li className="flex items-center justify-between bg-[rgb(242,247,250)] p-4 rounded shadow mb-4">
              <div className="flex w-full items-center gap-2">
                <AddLocationAltIcon className="w-8 h-8 text-[rgb(255,176,73)]" />

                {location ? (
                          <Input
                          type="text"
                          value={location}
                          readOnly
                          className="border w-full border-gray-100 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[rgb(255,127,58)]"
                          placeholder="Konumunuz"
                                 
                                           />
    
                ) : (
                  <span className="text-gray-500">
                    Konum Verilmedi
                  </span>
                )}
              </div>

              {!location && (
                <Button
                type="button"
                onClick={handleGetLocation}
       className="bg-[rgb(255,176,73)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                >Konum Al</Button>
       
              )}
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
                  <span className="text-gray-500">
                    Telefon Verilmedi
                  </span>
                )}
              </div>

              {!promptPhone && (
                <button
                  type="button"
                  onClick={handleGetPhone}
                  className="bg-[rgb(78,36,77)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                >
                  Telefon Ekle
                </button>
              )}
            </li>

        
            <li className="flex items-center justify-between bg-[rgb(242,247,250)] p-4 rounded shadow mb-4">
              <div className="flex w-full items-center gap-2">
                <ScheduleIcon className="w-8 h-8 text-[rgb(236,203,206)]" />

                {sure ? (
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={trLocale}
                  >
                    <DatePicker
                      label="Tarih Seç"
                      value={sure}
                      onChange={(newValue) => setSure(newValue)}
                    />
                  </LocalizationProvider>
                ) : (
                  <span className="text-gray-500">
                    Bitiş süresi belirtilmemiş
                  </span>
                )}
              </div>

              {!sure && (
                <button
                  type="button"
                  onClick={handleGetCalendar}
                  className="bg-[rgb(236,203,206)] w-1/2 text-[rgb(242,247,250)] px-4 py-1 rounded hover:bg-[rgb(255,127,58)]"
                >
                  Bitiş Tarihi Ekle
                </button>
              )}
            </li>


            {(promptPhone || location || sure) && (
              <div>
                <button
                  type="submit"
                  className="bg-[rgb(255,176,73)] w-full text-[rgb(242,247,250)] px-4 py-2 rounded"
                >
                  Tümünü Kaydet
                </button>
              </div>
            )}

          </form>
        </ul>
      </div>
    </>
  );
}
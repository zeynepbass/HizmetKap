"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Button } from "@/shared/components/atoms";

export function ProfilForm({
  form,
  telefon,
  setTelefon,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 shadow-md p-4 rounded-lg"
      >
        <div>
          <input
            type="text"
            name="ad"
            value={form.ad}
            onChange={handleChange}
            placeholder="Ad*"
            className="w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
          />
        </div>

        <div>
          <input
            type="text"
            name="soyad"
            value={form.soyad}
            onChange={handleChange}
            placeholder="Soyad*"
            className="w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
          />
        </div>

        <div>
          <label className="font-bold block mb-1 text-gray-300">
            Telefon*
          </label>

          <PhoneInput
            className="p-2"
            placeholder="(5xx) xxx xx xx"
            value={telefon}
            onChange={setTelefon}
          />
        </div>

        <Button
          type="submit"
          className="w-[50%] rounded-4xl mx-auto p-3 cursor-pointer bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
        >
          Kaydet
        </Button>
      </form>
    </div>
  );
}

"use client";

import { Button, Heading, Input } from "@/shared/components/atoms";

export function RegisterForm({
  formData,
  handleChange,
  handleSubmit,
  kullaniciStorage,
}) {
  return (
    <div className="flex w-full items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 "
      >
        <div className="mb-3">
          <Heading
            variant="login"
            title={kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
            desc={
              <>
                Kayıt olarak{" "}
                <span className="cursor-pointer underline">
                  Gizlilik Politikası
                </span>{" "}
                ve{" "}
                <span className="cursor-pointer underline">
                  Kullanım Şartlarını
                </span>{" "}
                kabul etmiş olursunuz.
              </>
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="text"
            name="ad"
            value={formData.ad}
            onChange={handleChange}
            placeholder="Ad*"
            className="w-full flex-1 rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
          />

          <Input
            type="text"
            name="soyad"
            value={formData.soyad}
            onChange={handleChange}
            placeholder="Soyad*"
            className="w-full flex-1 rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
          />
        </div>

        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          className="w-full rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
        />

        <Input
          type="password"
          name="parola"
          value={formData.parola}
          onChange={handleChange}
          placeholder="Parola*"
          className="w-full rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
        />

        <Button
          type="submit"
    className="mx-auto mt-5 w-full rounded-xl bg-[rgb(78,36,77)] p-3 text-sm font-semibold text-[rgb(242,247,250)] transition-colors duration-300 hover:bg-[rgb(34,44,49)] hover:text-white"
        >
          {kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
        </Button>
      </form>
    </div>
  );
}

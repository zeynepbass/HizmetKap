"use client";

import { Button, Heading,Input } from "@/shared/components/atoms";

export function RegisterForm({
  formData,
  handleChange,
  handleSubmit,
  kullaniciStorage,
}) {
  return (
    <div className="col-span-12 md:col-span-6 flex justify-center items-center bg-white p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4"
      >
        <Heading
          variant="login"
          title={kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
          desc={
            <>
              Kayıt olarak{" "}
              <span className="underline cursor-pointer">
                Gizlilik Politikası
              </span>{" "}
              ve{" "}
              <span className="underline cursor-pointer">
                Kullanım Şartlarını
              </span>{" "}
              kabul etmiş olursunuz.
            </>
          }
        />

        <div className="flex flex-col md:flex-row gap-4">
                               <Input
                           type="text"
                           name="ad"
                           value={formData.ad}
                           onChange={handleChange}
                           placeholder="Ad*"
                           className="flex-1 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                               
                         />
                       <Input
                     type="text"
                     name="soyad"
                     value={formData.soyad}
                     onChange={handleChange}
                     placeholder="Soyad*"
                     className="flex-1 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                          
                         />

        </div>
        <Input
               type="text"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Email*"
               className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
                 
                         />
                                 <Input
            type="password"
            name="parola"
            value={formData.parola}
            onChange={handleChange}
            placeholder="Parola*"
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
          
                         />



        <Button
          type="submit"
          className="w-[50%] rounded-4xl mx-auto p-3 cursor-pointer bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
        >
          {kullaniciStorage ? "Kayıt Ol" : "Kaydet"}
        </Button>
      </form>
    </div>
  );
}
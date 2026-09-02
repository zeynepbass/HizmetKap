"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Heading ,Input} from "@/shared/components/atoms";

export function LoginForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  const router = useRouter();

  return (
    <div className="col-span-12 md:col-span-6 bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] flex flex-col gap-1 rounded-lg p-10"
      >
        <Heading
          title="GİRİŞ YAP"
          desc="Güvenliğiniz için yalnızca kendi cihazlarınızdan giriş yapın."
        />
        <Input
         type="text"
         name="email"
         value={formData.email}
         onChange={handleChange}
         placeholder="Email*"
         className="rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] bg-[rgb(242,247,250)]"
        />
        <Input
          type="password"
          name="parola"
          value={formData.parola}
          onChange={handleChange}
          placeholder="Parola*"
          className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[rgb(255,176,73)] mt-2 bg-[rgb(242,247,250)]"
           />


        <div className="flex justify-between mt-2">
          <Link
            href="/sifremi-unuttum"
            className="text-gray-400 cursor-pointer"
          >
            Şifremi unuttum
          </Link>

          <span
            className="text-md text-gray-400 text-right pr-2 cursor-pointer"
            onClick={() => router.push("/kayit-ol")}
          >
            Kayıt ol
          </span>
        </div>

        <Button
          type="submit"
          className="w-[50%] rounded-4xl mx-auto p-3 cursor-pointer bg-[rgb(78,36,77)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(255,127,60)] transition-colors duration-300 mt-2"
        >
          Giriş Yap
        </Button>

        <Button
          onClick={() => router.push("/kullanici-adi-giris")}
          type="button"
          className="w-[50%] mx-auto p-3 cursor-pointer rounded-md text-gray-400 hover:text-gray-300 transition-colors duration-300 mt-2"
        >
          Kullanıcı adı ile giriş yap
        </Button>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Heading, Input } from "@/shared/components/atoms";

export function LoginForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-1"
      >
        <div className="mb-5">
          <Heading
            title="GİRİŞ YAP"
            desc="Güvenliğiniz için yalnızca kendi cihazlarınızdan giriş yapın."
          />
        </div>

        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
        />

        <Input
          type="password"
          name="parola"
          value={formData.parola}
          onChange={handleChange}
          placeholder="Parola*"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-[rgb(242,247,250)] p-3 text-sm outline-none transition focus:border-[rgb(34,44,49)] focus:ring-1 focus:ring-[rgb(34,44,49)]"
        />

        <div className="mt-3 flex items-center justify-between gap-4">
          <Link
            href="/sifremi-unuttum"
            className="text-sm text-gray-400 transition-colors hover:text-[rgb(78,36,77)]"
          >
            Şifremi unuttum
          </Link>

          <button
            type="button"
            onClick={() => router.push("/kayit-ol")}
            className="text-sm text-gray-400 transition-colors hover:text-[rgb(78,36,77)]"
          >
            Kayıt ol
          </button>
        </div>

        <Button
          type="submit"
          className="mx-auto mt-5 w-full rounded-xl bg-[rgb(78,36,77)] p-3 text-sm font-semibold text-[rgb(242,247,250)] transition-colors duration-300 hover:bg-[rgb(34,44,49)] hover:text-white"
        >
          Giriş Yap
        </Button>

        <Button
          type="button"
          onClick={() => router.push("/kullanici-adi-giris")}
          className="mx-auto mt-2 w-full rounded-xl p-3 text-sm text-gray-400 transition-colors duration-300 hover:bg-gray-50 hover:text-[rgb(78,36,77)]"
        >
          Kullanıcı adı ile giriş yap
        </Button>
      </form>
    </div>
  );
}

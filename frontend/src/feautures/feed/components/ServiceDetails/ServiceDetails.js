
"use client";

import { Heading } from "@/shared/components/atoms";
import { Location } from "@/shared/components/organism";

export function ServicegetUserDetails({ data }) {
  return (
    <section className="mt-8">


      <div className="mb-6">
        <Heading
          title="Detaylar"
          className="text-2xl font-semibold tracking-tight text-[#222C31]"
        />
      </div>


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


        <div className="border-b border-gray-100 px-5 py-5 md:px-6">
          <span className="text-xs font-medium uppercase tracking-wide text-[#6B4F6D]">
            Hizmet Kategorisi
          </span>

          <p className="mt-2 text-base font-semibold text-[#222C31]">
            {data?.anaBaslik || "Belirtilmemiş"}
          </p>
        </div>


        <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-2 md:px-6">


          <div className="rounded-xl bg-[#FCFBFD] p-4">
            <span className="text-xs font-medium text-gray-400">
              Durum
            </span>

            <p className="mt-1 text-sm font-semibold text-[#6B4F6D]">
              {data?.durum || "Belirtilmemiş"}
            </p>
          </div>


          <div className="rounded-xl bg-[#FCFBFD] p-4">
            <span className="text-xs font-medium text-gray-400">
              İlan Tarihi
            </span>

            <p className="mt-1 text-sm font-semibold text-[#222C31]">
              {data?.baslangicTarihi
                ? new Date(data.baslangicTarihi).toLocaleDateString("tr-TR")
                : "Belirtilmemiş"}

              {data?.bitisTarihi && (
                <span className="text-gray-400">
                  {" "}
                  -{" "}
                  {new Date(data.bitisTarihi).toLocaleDateString("tr-TR")}
                </span>
              )}
            </p>
          </div>

        </div>


        {data?.konum && (
          <div className="border-t border-gray-100 px-5 py-5 md:px-6">
            <div className="mb-3">
              <span className="text-xs font-medium uppercase tracking-wide text-[#6B4F6D]">
                Konum
              </span>
            </div>

            <div className="rounded-xl border border-gray-100 bg-[#FCFBFD] p-4">
              <Location konum={data.konum} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

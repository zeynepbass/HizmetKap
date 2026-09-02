"use client";

import { Heading } from "@/shared/components/atoms";
import KonumHarita from "../../../Konum";

export function ServiceDetails({ data }) {
  return (
    <>
      <hr className="text-gray-100" />

      <Heading
        title="Detaylar"
        className="text-3xl font-bold text-center text-gray-600"
      />

      <span className="mb-4 text-xl font-bold text-gray-600 text-left">
        {data?.anaBaslik}
      </span>

      <div className="mb-4 text-xl font-bold text-gray-600 text-left">
        <span className="text-sm text-gray-400">
          Durum: {data?.durum}
          <br />

          İlan Tarihi:
          {data?.baslangicTarihi &&
            new Date(data.baslangicTarihi).toLocaleDateString("tr-TR")}

          {data?.bitisTarihi && (
            <>
              -{new Date(data.bitisTarihi).toLocaleDateString("tr-TR")}
            </>
          )}

          <br />

          {data?.konum && (
            <div>
              <p className="font-medium text-gray-700 mb-2">
                Konum:
              </p>

              <KonumHarita konum={data.konum} />
            </div>
          )}
        </span>
      </div>
    </>
  );
}
export function KullaniciCard({ slide, onMessage }) {
    return (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <p className="text-md text-gray-400 mb-2">
            <span className="font-semibold">
              Yayınlayan: {slide.ad.toUpperCase()}
            </span>
            <br />
  
            <span className="font-semibold">
              Telefon No: {slide.telefonNo}
            </span>
            <br />
  
            <span className="font-semibold">
              Email: {slide.email}
            </span>
            <br />
  
            <span className="font-semibold">
              Konum: <Konum konum={slide.konum} />
            </span>
          </p>
        </div>
  
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-2 text-center">
            <span className="font-semibold">Kategoriler:</span>{" "}
            {slide.kategoriIsim}
          </p>
  
          <p className="text-sm text-gray-500 text-center mb-4">
            <span className="font-semibold">İlan tarihi:</span>{" "}
            {slide.baslangicTarihi && slide.bitisTarihi
              ? `${new Date(slide.baslangicTarihi).toLocaleDateString(
                  "tr-TR"
                )} - ${new Date(slide.bitisTarihi).toLocaleDateString("tr-TR")}`
              : "Süresiz"}
          </p>
  
          <div className="space-y-2">
            {slide.veriler.map((veri, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
              >
                <span className="font-semibold">
                  {veri.kategoriIsim}:
                </span>{" "}
                <span>
                  Seçenekler: {veri.secenekler.join(", ")}
                </span>{" "}
                <span>Seçilen: {veri.secilen}</span>
              </div>
            ))}
          </div>
  
          <div className="flex justify-center mt-5">
            <Button
              onClick={onMessage}
              type="button"
              className="w-[50%] rounded-4xl mx-auto p-3 cursor-pointer bg-[rgb(255,127,60)] text-[rgb(242,247,250)] hover:text-gray-50 hover:bg-[rgb(78,36,77)] transition-colors duration-300 mt-2"
            >
              Mesaj At
            </Button>
          </div>
        </div>
      </div>
    );
  }
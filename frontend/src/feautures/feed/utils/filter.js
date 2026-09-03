
import { toSlugUrl } from "@/shared/helpers/toSlug";

export function filterTadilat(
  tadilatlar,
  isim,
  storedKullaniciAdi,
  kullaniciStored
)  {
  return tadilatlar.filter(
    (item) =>
      toSlugUrl(item?.anaBaslik) === isim &&
      item?.durum === "aktif" &&
      (storedKullaniciAdi ||
        item?.email !== kullaniciStored?.kullanici?.email)
  );
};

export function filterTadilatByStatus (items, status) {
  return items.filter((item) => {
    if (status === "aktif") {
      return item?.durum === "aktif";
    }

    return (
      item?.durum === "pasif" ||
      item?.durum === "iptal"
    );
  });
};

export function filterTadilatByUser (items, email) {
  return items.filter(
    (item) => item?.email === email
  );
};


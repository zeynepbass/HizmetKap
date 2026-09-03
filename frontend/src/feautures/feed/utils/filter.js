
import { toSlugUrl } from "@/shared/utils/toSlugUrl";

export const filterTadilat = (
  tadilatlar,
  isim,
  storedKullaniciAdi,
  kullaniciStored
) => {
  return tadilatlar.filter(
    (item) =>
      toSlugUrl(item?.anaBaslik) === isim &&
      item?.durum === "aktif" &&
      (storedKullaniciAdi ||
        item?.email !== kullaniciStored?.kullanici?.email)
  );
};

export const filterTadilatByStatus = (items, status) => {
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

export const filterTadilatByUser = (items, email) => {
  return items.filter(
    (item) => item?.email === email
  );
};


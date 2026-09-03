export {toSlugUrl} from "@/shared/helpers/toSlug"
export function filterTadilat(category, isim, storedKullaniciAdi, kullaniciStored) {
  return category.filter(
    (item) =>
      toSlugUrl(item?.anaBaslik) === isim &&
      item?.durum === "aktif" &&
      (storedKullaniciAdi ||
        item?.email !== kullaniciStored?.kullanici?.email)
  );
}


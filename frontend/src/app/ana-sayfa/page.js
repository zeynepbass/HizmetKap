
import { getAktifTadilat } from "@/services/api";
import Anasayfa from "@/features/feed/pages/Anasayfa";

export default async function page() {
  const itemsAktif = await getAktifTadilat();

  return <Anasayfa itemsAktif={itemsAktif} />;
};



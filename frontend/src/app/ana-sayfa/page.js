
import { getAktifTadilat } from "@/services/api";
import Home from "@/features/feed/pages/Home";

export default async function page() {
  const itemsAktif = await getAktifTadilat();

  return <Home itemsAktif={itemsAktif} />;
};



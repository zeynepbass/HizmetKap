
import { getAktifTadilat } from "@/services/api";
import Anasayfa from "@/features/feed/Anasayfa";

const page = async () => {
  const itemsAktif = await getAktifTadilat();

  return <Anasayfa itemsAktif={itemsAktif} />;
};

export default page;

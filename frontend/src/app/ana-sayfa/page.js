
import { getActiveRenovations } from "@/features/feed/api";
import Home from "@/feautures/feed/pages/Home";

export default async function page() {
  const itemsAktif = await getActiveRenovations();

  return <Home itemsAktif={itemsAktif} />;
};



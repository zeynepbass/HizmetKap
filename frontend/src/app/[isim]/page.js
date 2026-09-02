

import Kullanicilar from "@/feautures/user/pages/Kullanicilar";

export default async function page() {
  const params = useParams();
  const { isim } = params;
  return <Kullanicilar isim={isim} />;
};



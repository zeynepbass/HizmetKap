

import Kullanicilar from "@/feautures/user/pages/Users";

export default async function page({params}) {

  const { isim } = params;
  return <Kullanicilar isim={isim} />;
};



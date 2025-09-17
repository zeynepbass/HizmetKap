import React from "react";
import { getAktifTadilat } from "../services/api";
import HomeClient from "../components/Home";

const Page = async () => {
  const itemsAktif = await getAktifTadilat();

  return <HomeClient itemsAktif={itemsAktif} />;
};

export default Page;
